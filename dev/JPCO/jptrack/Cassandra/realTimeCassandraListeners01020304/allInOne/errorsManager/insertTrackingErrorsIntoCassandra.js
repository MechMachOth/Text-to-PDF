import { cassandraClient } from '../conf/connexionDbCassandra.js';

async function insertTrackingErrorsIntoCassandra(errorRow, error) {
    const errorInsertQuery = `
    INSERT INTO trackings_not_inserted (date_et_heure, id_tracking, error) VALUES (?, ?, ?);`;
    const errorInsertParams = [
        new Date(),
        errorRow.id_tracking,
        error.toString()
    ];
    try {
        await cassandraClient.execute(errorInsertQuery, errorInsertParams, { prepare: true });
        return;
    } catch (error) {
        console.error(' ❌ Error storing failed tracking id:', error);
    }
}

export { insertTrackingErrorsIntoCassandra };
