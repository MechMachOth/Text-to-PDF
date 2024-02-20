import { cassandraClient } from '../conf/connexionDbCassandra.js';

async function insertDataOneByOneIntoCassandra(data,res) {
    const query = `
    INSERT INTO tracking_by_day (
    id_vehicule,
    year,
    month,
    day,
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
    etatsignal,
    event,
    external_power,
    fuel_consumed,
    fuel_rate,
    gnss_status,
    gps_hdop,
    gps_pdop,
    gps_speed,
    id_device,
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
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;



    const alertChecked = data.alert_checked === 1;
    const accStatus = data.acc_status === 1;
    const trackingOnEvent = data.tracking_on_event === 1;
    const panicButtonStatus = data.panic_button_status === 1;
    const movement = data.movement === 1;
    const distenceCorrected = data.distence_corrected === 1;

    const params= [
    data.id_vehicule,
    data.year,
    data.month,
    data.day,
    data.tracking_time,
    accStatus,
    data.accelerator_pedal_position,
    data.actual_profile,
    alertChecked,
    trackingOnEvent,
    panicButtonStatus,
    movement,
    distenceCorrected,
    data.altitude,
    JSON.stringify(data.alv_data),
    data.angle,
    data.area_code,
    data.can_fuel_level,
    data.can_speed,
    data.cell_id,
    data.crash_detect,
    data.current_battery,
    data.door_status,
    data.ecodrive_duration,
    data.ecodrive_type,
    data.ecodrive_value,
    data.engine_oil_level,
    data.engine_rpm,
    data.engine_temp,
    data.engine_worktime,
    data.etat,
    data.etatSignal,
    data.event,
    data.external_power,
    data.fuel_consumed,
    data.fuel_rate,
    data.gnss_status,
    data.gps_hdop,
    data.gps_pdop,
    data.gps_speed,
    data.id_device,
    data.input,
    data.internal_battery,
    data.jaming,
    data.km,
    data.latitude,
    data.longitude,
    data.message,
    data.operator_code,
    data.pcb_temp,
    data.priority,
    data.reception_timespan,
    data.reservoir1,
    data.reservoir2,
    data.rfid,
    data.satellites,
    data.sleep_mode,
    data.speed,
    data.temperature1,
    data.temperature2,
    data.total_mileage];
    try {
        await cassandraClient.execute(query, params, { prepare: true });
        return data.id_tracking;
    }catch  (error) {
        console.log({ message: " ❌ Erreur cassandraClient.execute(query, params, { prepare: true }) in \"insertDataOneByOneIntoCassandra\"", error })
        throw error;
    }
}

export { insertDataOneByOneIntoCassandra };
