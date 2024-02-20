# script migration trackings MySQL to Cassandra

curl
-X POST
-H "Content-Type: application/json"
-H "Authorization: Bearer [TOKEN]"
-d '{
    "batchSize": 200,
    "offset": 0,
    "limite": 600,
    "stopAtThisIdTracking": null
     }'
     http://localhost:3000/trackingByDayToCassandra
     