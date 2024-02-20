// import { Client } from 'cassandra-driver';
// import dotenv from 'dotenv';
// import * as fs from 'fs';

// dotenv.config();

// const {
//     CASSANDRA_HOST,
//     CASSANDRA_PORT,
//     CASSANDRA_KEYSPACE,
//     CASSANDRA_USER,
//     CASSANDRA_PASSWORD,
//     CA_CERTIFICATE_PATH
// } = process.env;

// const cassandraClientConf = new Client({
//     contactPoints: [`${CASSANDRA_HOST}:${CASSANDRA_PORT}`],
//     localDataCenter: 'aiven',
//     credentials: { username: CASSANDRA_USER, password: CASSANDRA_PASSWORD },
//     sslOptions: {
        // cert: fs.readFileSync(CA_CERTIFICATE_PATH),
//     }
// });

// const dropKeyspace = async () => {
//     try {
//         await cassandraClientConf.execute(`
//             DROP KEYSPACE IF EXISTS ${CASSANDRA_KEYSPACE}
//         `);
//         console.log(` ✅ Keyspace ${CASSANDRA_KEYSPACE} dropped successfully`);
//     } catch (err) {
//         console.error(' ❌ Unable to drop keyspace:', err);
//     }
// };


// async function connectToCassandra() {
//     try {
//         await cassandraClientConf.connect();
//         console.log(' ✅ Connected to Cassandra 🔗')
//     } catch (err) {
//         console.error(' ❌ Unable to connect to Cassandra:', err);
//         throw(err)
//     }
//     try{
//         // await dropKeyspace();
//         await cassandraClientConf.execute(`USE ${CASSANDRA_KEYSPACE}`);
//         await console.log('      ➡️ Using keyspace "' + CASSANDRA_KEYSPACE + '".');
//         // console.log('Details:', cassandraClientConf);
//         return cassandraClientConf;
//     } catch (err){
//         console.error(' ❌ Unable to connect to Cassandra:', err);
//         createKeyspaceAndTables();
//     }
// }
// const createKeyspaceAndTables = async () => {
//     try {
//         console.log('création Keyspace "jptrack"...')
//         await cassandraClientConf.execute(`
//             CREATE KEYSPACE IF NOT EXISTS ${CASSANDRA_KEYSPACE}
//             WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 3}
//         `);
//         await cassandraClientConf.execute(`USE ${CASSANDRA_KEYSPACE}`);
//         await console.log('      ➡️ Using keyspace "' + CASSANDRA_KEYSPACE + '".');
//         await cassandraClientConf.execute(`DROP TABLE IF EXISTS tracking_by_day`);
//         await cassandraClientConf.execute(`DROP TABLE IF EXISTS trackings_not_inserted`);
//         await cassandraClientConf.execute(`DROP TABLE IF EXISTS last_tracking_inserted`);
//         await console.log('création de la TABLE "tracking_by_day"...')
//         await cassandraClientConf.execute(`CREATE TABLE IF NOT EXISTS tracking_by_day (id_vehicule int,  year int,  month int,  day int,  tracking_time timestamp,  acc_status tinyint,  accelerator_pedal_position decimal,  actual_profile int,  alert_checked tinyint,  tracking_on_event tinyint,  panic_button_status tinyint,  movement tinyint,  distence_corrected tinyint,  altitude int,  alv_data text,  angle int,  area_code int,  can_fuel_level decimal,  can_speed decimal,  cell_id int,  crash_detect decimal,  current_battery double,  door_status decimal,  ecodrive_duration decimal,  ecodrive_type decimal,  ecodrive_value decimal,  engine_oil_level decimal,  engine_rpm decimal,  engine_temp decimal,  engine_worktime decimal,  etat int,  etatsignal int,  event int,  external_power double,  fuel_consumed decimal,  fuel_rate decimal,  gnss_status int,  gps_hdop double,  gps_pdop double,  gps_speed int,  id_device int,  input text,  internal_battery double,  jaming decimal,  km double,  latitude double,  longitude double,  message text,  operator_code int,  pcb_temp double,  priority int,  reception_timespan timestamp,  reservoir1 double,  reservoir2 double,  rfid text,  satellites int,  sleep_mode int,  speed double,  temperature1 double,  temperature2 double,  total_mileage decimal,  PRIMARY KEY ((id_vehicule, year, month, day), tracking_time)) WITH CLUSTERING ORDER BY (tracking_time DESC)`);
//         await console.log('création de la TABLE "last_tracking_inserted"...')
//         await cassandraClientConf.execute(`CREATE TABLE IF NOT EXISTS last_tracking_inserted (rowid int PRIMARY KEY, id_tracking bigint)`);
//         await cassandraClientConf.execute(`INSERT INTO last_tracking_inserted (rowid, id_tracking) VALUES (1, 1)`);
//         await console.log('création de la TABLE "trackings_not_inserted"...')
//         await cassandraClientConf.execute(`CREATE TABLE IF NOT EXISTS trackings_not_inserted (date_et_heure timestamp, id_tracking bigint, error text, PRIMARY KEY (id_tracking, date_et_heure)) WITH CLUSTERING ORDER BY (date_et_heure DESC)`);
//         await console.log(' ✅ Keyspace and tables created successfully');
//     } catch (err) {
//         console.error(' ❌ Unable to create keyspace and tables:', err);
//     }
// };
// const cassandraClient = await connectToCassandra();



// export { cassandraClient };

import { Client } from 'cassandra-driver';
import dotenv from 'dotenv';

dotenv.config();


const cassandraClientConf = new Client({
    contactPoints: [process.env.CASSANDRA_HOST],
    localDataCenter: 'datacenter1'
});

async function connectToCassandra() {
    try {
        await cassandraClientConf.connect();
        console.log(' ✅ Connected to Cassandra 🔗');
        await cassandraClientConf.execute('USE ' + process.env.CASSANDRA_KEYSPACE);
        console.log('      ➡️ Using keyspace "' + process.env.CASSANDRA_KEYSPACE + '".');
        return cassandraClientConf;
    } catch (err) {
        console.error(' ❌ Unable to connect to Cassandra:', err);
        throw err;
    }
}

const cassandraClient = await connectToCassandra();

export { cassandraClient };
