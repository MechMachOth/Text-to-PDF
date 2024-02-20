docker start cassandra-container
docker ps -a | grep 1d33ca6c4486
docker exec -it cassandra-container cqlsh

CREATE KEYSPACE IF NOT EXISTS jptrack;

USE jptrack;

DROP TABLE IF EXISTS tracking_by_day;
DROP TABLE IF EXISTS trackings_not_inserted;
DROP TABLE IF EXISTS last_tracking_inserted;

CREATE TABLE IF NOT EXISTS tracking_by_day (id_vehicule int,  year int,  month int,  day int,  tracking_time timestamp,  acc_status tinyint,  accelerator_pedal_position decimal,  actual_profile int,  alert_checked tinyint,  tracking_on_event tinyint,  panic_button_status tinyint,  movement tinyint,  distence_corrected tinyint,  altitude int,  alv_data text,  angle int,  area_code int,  can_fuel_level decimal,  can_speed decimal,  cell_id int,  crash_detect decimal,  current_battery double,  door_status decimal,  ecodrive_duration decimal,  ecodrive_type decimal,  ecodrive_value decimal,  engine_oil_level decimal,  engine_rpm decimal,  engine_temp decimal,  engine_worktime decimal,  etat int,  etatsignal int,  event int,  external_power double,  fuel_consumed decimal,  fuel_rate decimal,  gnss_status int,  gps_hdop double,  gps_pdop double,  gps_speed int,  id_device int,  input text,  internal_battery double,  jaming decimal,  km double,  latitude double,  longitude double,  message text,  operator_code int,  pcb_temp double,  priority int,  reception_timespan timestamp,  reservoir1 double,  reservoir2 double,  rfid text,  satellites int,  sleep_mode int,  speed double,  temperature1 double,  temperature2 double,  total_mileage decimal,  PRIMARY KEY ((id_vehicule, year, month, day), tracking_time)) WITH CLUSTERING ORDER BY (tracking_time DESC);

CREATE TABLE IF NOT EXISTS last_tracking_inserted (rowid int PRIMARY KEY, id_tracking bigint);
INSERT INTO last_tracking_inserted (rowid, id_tracking) VALUES (1, 1);

CREATE TABLE IF NOT EXISTS trackings_not_inserted (date_et_heure timestamp, id_tracking bigint, error text, PRIMARY KEY (id_tracking, date_et_heure)) WITH CLUSTERING ORDER BY (date_et_heure DESC);


