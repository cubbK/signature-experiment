const argv = require("minimist")(process.argv.slice(2));
const pc = process.env.PC;

const axios = require("axios");

console.log("PC: " + pc)

async function main() {
  try {
    const response = await axios.post(
      "http://validation-server:4000/activate",
      {
        license: "key1",
        pc: pc
      }
    );
    console.log(response.data);
  } catch (err) {
    console.log(err.response.data);
  }
}

main();
