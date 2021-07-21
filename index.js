const express = require('express');
const app = express();
const cron = require('node-cron');
const NodeCache = require("node-cache");
const myCache = new NodeCache();

app.use(express.json());

cron.schedule('*/1 * * * * *', function () {
  value = myCache.get("myKey");
  if (value == undefined) {
    // handle miss!
    console.log("Cannot find key from cache, setting one");
    const obj = { my: "Special", variable: 42 };
    const obj2 = { my: "other special", variable: 1337 };

    const success = myCache.mset([
      { key: "myKey", val: obj, ttl: 10000 },
      { key: "myKey2", val: obj2 },
    ])
  } else {
    console.log("Value from cache" + JSON.stringify(value));
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});