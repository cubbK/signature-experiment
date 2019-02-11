docker-compose up

docker-compose exec app_1 bash
node index.js --key key1 // should activate

docker-compose exec app_1 bash
node index.js --key key1 // should not work