import { mysqlConnection1, mysqlConnection2, mysqlConnection3, mysqlConnection4 } from '../conf/connexionDbMySQL.js';

let id_tracking_end_listener1
let id_tracking_end_listener4
let id_tracking_end_listener3
let id_tracking_end_listener2

async function fetchDataFromMySQL(batchSize1, batchSize2, batchSize3, batchSize4, id_tracking_stat_listener1, id_tracking_stat_listener2, id_tracking_stat_listener3, id_tracking_stat_listener4 ) {
    try {
        const promises = [
            queryDatabase(mysqlConnection1,batchSize1, id_tracking_stat_listener1, '01'),
            queryDatabase(mysqlConnection2,batchSize2, id_tracking_stat_listener2, '02'),
            queryDatabase(mysqlConnection3,batchSize3, id_tracking_stat_listener3, '03'),
            queryDatabase(mysqlConnection4,batchSize4, id_tracking_stat_listener4, '04')
        ];
        const resultsArray = await Promise.all(promises);
        const mergedResults = resultsArray.reduce((acc, current) => acc.concat(current), []);
        return {
            mergedResults,
            id_tracking_end_listener1,
            id_tracking_end_listener2,
            id_tracking_end_listener3,
            id_tracking_end_listener4
        };
    } catch (error) {
        throw error;
    }
}

function queryDatabase(connection,batchSize, id_tracking, listener) {
    console.log(`⌛ Fetching ${batchSize} data from tracking table MySQL listener ${listener}...`)
    return new Promise((resolve, reject) => {
        connection.query(
        `SELECT
        id_vehicule,
        YEAR(tracking_time) as year,
        MONTH(tracking_time) as month,
        DAY(tracking_time) as day,
        tracking_time,
        acc_status,
        accelerator_pedal_position,
        actual_profile,
        alert_checked,
        tracking_on_event,
        panic_button_status,
        movement,
        distence_corrected,
        altitude,
        alv_data,
        angle,
        area_code,
        can_fuel_level,
        can_speed,
        cell_id,
        crash_detect,
        current_battery,
        door_status,
        ecodrive_duration,
        ecodrive_type,
        ecodrive_value,
        engine_oil_level,
        engine_rpm,
        engine_temp,
        engine_worktime,
        etat,
        etatSignal,
        event,
        external_power,
        fuel_consumed,
        fuel_rate,
        gnss_status,
        gps_hdop,
        gps_pdop,
        gps_speed,
        id_device,
        id_tracking,
        input,
        internal_battery,
        jaming,
        km,
        latitude,
        longitude,
        message,
        operator_code,
        pcb_temp,
        priority,
        reception_timespan,
        reservoir1,
        reservoir2,
        rfid,
        satellites,
        sleep_mode,
        speed,
        temperature1,
        temperature2,
        total_mileage
        FROM tracking
        WHERE ID_tracking >= ${id_tracking}
        LIMIT ${batchSize};`,
        (error, results) => {
            if (error) {
            reject(error);
            } else {
                if (listener == '01') {
                    id_tracking_end_listener1 = results[results.length - 1] ? results[results.length - 1].id_tracking : id_tracking_end_listener1;
                } else if (listener == '02') {
                    id_tracking_end_listener2 = results[results.length - 1] ? results[results.length - 1].id_tracking : id_tracking_end_listener2;
                } else if (listener == '03') {
                    id_tracking_end_listener3 = results[results.length - 1] ? results[results.length - 1].id_tracking : id_tracking_end_listener3;
                } else if (listener == '04') {
                    id_tracking_end_listener4 = results[results.length - 1] ? results[results.length - 1].id_tracking : id_tracking_end_listener4;
                }
                resolve(results);
            }
    });
    });
}


export { fetchDataFromMySQL };
