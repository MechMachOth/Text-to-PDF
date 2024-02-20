import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import { insertDataChunkIntoCassandra } from './actionsCassandra/insertDataChunkIntoCassandra.js';
import { insertDataOneByOneIntoCassandra } from './actionsCassandra/insertDataOneByOneIntoCassandra.js';
import { fetchDataFromMySQL } from './actionsMySQL/fetchDataFromMySQL.js';
import { insertTrackingErrorsIntoCassandra } from './errorsManager/insertTrackingErrorsIntoCassandra.js';
import { updateLastTrackingInsertedIntoCassandra } from './errorsManager/updateLastTrackingInsertedIntoCassandra.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT;
const server = process.env.SERVER;

const _verifyRequestToken = (request, response, next) => {
    const authorization = request.headers['authorization']
    const token = authorization && authorization.split(' ')[1]
    if (token == null) return response.status(401).send({status: 401, statusText: " ❌ unauthorized", statusBoolean: false})
    jwt.verify(token, process.env.TOKEN_SECRET, {}, (error) => {
        if (error) return response.status(401).send({status: 401, statusText: " ❌ unauthorized", statusBoolean: false})
        next()
    })
};
app.use("/*", _verifyRequestToken);

/*
curl -X POST -H "Content-Type: application/json"
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiJhcHBOYW1lIiwiY3JlYXRlZF9hdCI6IjIwMjMtMTItMjVUMTE6MTU6NDYuOTMyWiIsImlhdCI6MTcwMzUwMjk0Nn0.486oGHUkkWYGcVXiE4H5_V1CD-00vu3waJt2YRVbXls" 
-d '{"delai" : 2, "batchSize1": 250, "batchSize2": 250, "batchSize3": 250, "batchSize4": 250, "id_tracking_stat_listener1": 620000000, "id_tracking_stat_listener2": 630000000, "id_tracking_stat_listener3": 640000000, "id_tracking_stat_listener4": 650000000}'
http://localhost:3001/trackingByDayToCassandra
*/
app.post('/trackingByDayToCassandra', async (req, res) => {
    let { delai, batchSize1, batchSize2, batchSize3, batchSize4, id_tracking_stat_listener1, id_tracking_stat_listener2, id_tracking_stat_listener3, id_tracking_stat_listener4 } = req.body;
    let nbrErrorsInsertion = 0
    let lastIdTrackingCassandra = null;
    let id_tracking_end_listener1
    let id_tracking_end_listener4
    let id_tracking_end_listener3
    let id_tracking_end_listener2
    while(true) {
        console.log('ℹ️ id_tracking actuel (listener1) = ', id_tracking_stat_listener1 +".")
        console.log('ℹ️ id_tracking actuel (listener2) = ', id_tracking_stat_listener2 +".")
        console.log('ℹ️ id_tracking actuel (listener3) = ', id_tracking_stat_listener3 +".")
        console.log('ℹ️ id_tracking actuel (listener4) = ', id_tracking_stat_listener4 +".")
        if(delai && delai>0){
            async function delay(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
            console.log(`⌛ pause de ${delai}sec`);
            await delay(delai*1000);
        }
        let mysqlData = []
        try {
            const fetchResult = await fetchDataFromMySQL(batchSize1, batchSize2, batchSize3, batchSize4, id_tracking_stat_listener1, id_tracking_stat_listener2, id_tracking_stat_listener3, id_tracking_stat_listener4 );
                if (fetchResult){
                    mysqlData = fetchResult.mergedResults;
                    id_tracking_end_listener1 = fetchResult.id_tracking_end_listener1;
                    id_tracking_end_listener2 = fetchResult.id_tracking_end_listener2;
                    id_tracking_end_listener3 = fetchResult.id_tracking_end_listener3;
                    id_tracking_end_listener4 = fetchResult.id_tracking_end_listener4;
                    if (mysqlData && mysqlData.length > 0) {
                        id_tracking_stat_listener1 = id_tracking_end_listener1
                        id_tracking_stat_listener4 = id_tracking_end_listener4
                        id_tracking_stat_listener3 = id_tracking_end_listener3
                        id_tracking_stat_listener2 = id_tracking_end_listener2
                        try {
                            console.log(`⌛ Inserting ${mysqlData.length} data chunk tracking into Cassandra (table : "tracking_by_day")...`);
                            const insertPromises = mysqlData.map(async (data) => {
                                lastIdTrackingCassandra = await insertDataChunkIntoCassandra(data)
                            });
                            await Promise.all(insertPromises);
                            console.log(`⌛ Inserting last tracking (tracking_id = ${lastIdTrackingCassandra}) inserted into Cassandra (table : "last_tracking_inserted")...`);
                            await updateLastTrackingInsertedIntoCassandra(lastIdTrackingCassandra)
                            console.log(`${mysqlData.length} Chunk data inserted into cassandra 👍.`);
                        } catch (err) {
                            console.error(' ❌ Batch insertion error mysqlData.map:', err);
                            for (const data of mysqlData) {
                                try {
                                    console.log(`⌛ Inserting data OneByOne (tracking_id = ${data.id_tracking}) tracking into Cassandra (table : "tracking_by_day")...`);
                                    lastIdTrackingCassandra = await insertDataOneByOneIntoCassandra(data)
                                    console.log(`⌛ Inserting last tracking (tracking_id = ${lastIdTrackingCassandra}) inserted into Cassandra (table : "last_tracking_inserted")...`);
                                    await updateLastTrackingInsertedIntoCassandra(lastIdTrackingCassandra, id_tracking_end_listener1, id_tracking_end_listener2, id_tracking_end_listener3, id_tracking_end_listener4, delai)
                                } catch (error) {
                                    console.error(' ❌ Error during OneByOne insertion :', error);
                                    await insertTrackingErrorsIntoCassandra(data, error)
                                    nbrErrorsInsertion = nbrErrorsInsertion +1;
                                }
                                console.log(`OneByOne data (tracking_id = ${data.id_tracking}) inserted into cassandra 👍.`);
                            }
                        }
                    }
                }
        } catch (err) {
            console.log(' ❌ Erreu = ', err)
            console.log('ℹ️ NO DATA!!! mysqlData = ', mysqlData)
        }
        console.log('---------------------------------------------------------------------------------------------------------------');
    }
});


app.listen(port, server, () => {
    console.log(`🖥️  is 🏃‍♀️ on http://${server}:${port}`);
});
