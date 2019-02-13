const argv = require("minimist")(process.argv.slice(2));
const storage = require("node-persist");
const axios = require("axios");
const id = process.env.ID;

async function main() {
  

  await storage.init({
    dir: "/storage"
  });

  let isActivated = false;
  const pcUsed = await storage.getItem("pcUsed");
  if (pcUsed === undefined) {
    try {
      const activationData = await activate();
      await storage.setItem("pcUsed", activationData.pcUsed);
      isActivated = true;
    } catch (err) {
      console.log(err && err.response && err.response.data);
    }
  } else if (pcUsed === id) {
    isActivated = true;
  }

  if (isActivated) {
    runApp();
  } else {
    console.log("licence is not valid");
  }
}

function runApp() {
  console.log("License OK, Running app...");
}

async function activate() {
  const response = await axios.post("http://validation-server:4000/activate", {
    license: argv.key,
    pc: id
  });
  const data = response.data;
  return data;
}

main();
