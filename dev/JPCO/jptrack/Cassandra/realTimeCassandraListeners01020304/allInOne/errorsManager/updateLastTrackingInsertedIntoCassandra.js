import dotenv from 'dotenv';
import { cassandraClient } from '../conf/connexionDbCassandra.js';

dotenv.config();

async function updateLastTrackingInsertedIntoCassandra(lastIdTrackingInsertedIntoCassandra, id_tracking_from_mysql_end_listener1, id_tracking_from_mysql_end_listener2, id_tracking_from_mysql_end_listener3, id_tracking_from_mysql_end_listener4, delai) {
    const query1 = `UPDATE params_and_info_mysql_to_cassandra 
                    SET last_tracking_inserted_into_cassandra = ?, 
                        last_tracking_receved_from_mysql = ? , 
                        delai = ? 
                    WHERE listener = ?`;
    const query2 = `UPDATE params_and_info_mysql_to_cassandra 
                    SET last_tracking_inserted_into_cassandra = ?, 
                        last_tracking_receved_from_mysql = ? , 
                        delai = ? 
                    WHERE listener = ?`;
    const query3 = `UPDATE params_and_info_mysql_to_cassandra 
                    SET last_tracking_inserted_into_cassandra = ?, 
                        last_tracking_receved_from_mysql = ? , 
                        delai = ? 
                    WHERE listener = ?`;
    const query4 = `UPDATE params_and_info_mysql_to_cassandra 
                    SET last_tracking_inserted_into_cassandra = ?, 
                        last_tracking_receved_from_mysql = ? , 
                        delai = ? 
                    WHERE listener = ?`;
    const params1 = [
        lastIdTrackingInsertedIntoCassandra, 
        id_tracking_from_mysql_end_listener1, 
        delai, 
        process.env.Listener1
    ];
    const params2 = [
        lastIdTrackingInsertedIntoCassandra, 
        id_tracking_from_mysql_end_listener2, 
        delai, 
        process.env.Listener2
    ];
    const params3 = [
        lastIdTrackingInsertedIntoCassandra, 
        id_tracking_from_mysql_end_listener3, 
        delai, 
        process.env.Listener3
    ];
    const params4 = [
        lastIdTrackingInsertedIntoCassandra, 
        id_tracking_from_mysql_end_listener4, 
        delai, 
        process.env.Listener4
    ];
    try {
        await cassandraClient.execute(query1, params1, { prepare: true });
        await cassandraClient.execute(query2, params2, { prepare: true });
        await cassandraClient.execute(query3, params3, { prepare: true });
        await cassandraClient.execute(query4, params4, { prepare: true });
        console.log(`
            ℹ️ params_and_info_mysql_to_cassandra updated with :
            - last_tracking_inserted_into_cassandra= ${lastIdTrackingInsertedIntoCassandra}  and  last_tracking_receved_from_mysql= ${id_tracking_from_mysql_end_listener1} 👍 [listener${process.env.Listener1}]
            - last_tracking_inserted_into_cassandra= ${lastIdTrackingInsertedIntoCassandra}  and  last_tracking_receved_from_mysql= ${id_tracking_from_mysql_end_listener2} 👍 [listener${process.env.Listener2}]
            - last_tracking_inserted_into_cassandra= ${lastIdTrackingInsertedIntoCassandra}  and  last_tracking_receved_from_mysql= ${id_tracking_from_mysql_end_listener3} 👍 [listener${process.env.Listener3}]
            - last_tracking_inserted_into_cassandra= ${lastIdTrackingInsertedIntoCassandra}  and  last_tracking_receved_from_mysql= ${id_tracking_from_mysql_end_listener4} 👍 [listener${process.env.Listener4}]
        `);
    } catch (error) {

        console.error(' ❌ Error updating params_and_info_mysql_to_cassandra:', error);
        console.log('listener1:', process.env.listener1);
console.log('listener2:', process.env.listener2);
console.log('listener3:', process.env.listener3);
console.log('listener4:', process.env.listener4);

    }
}

export { updateLastTrackingInsertedIntoCassandra };
