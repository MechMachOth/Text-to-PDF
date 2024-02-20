function splitMySQLData (mysqlData) {

const midIndex = Math.ceil(mysqlData.length / 2);
const mysqlData_1 = mysqlData.slice(0, midIndex);
const mysqlData_2 = mysqlData.slice(midIndex);

return {mysqlData_1, mysqlData_2};
}

export { splitMySQLData };
