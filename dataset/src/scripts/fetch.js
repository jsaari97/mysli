const fetch = require("../html");
const configs = require("../config");
const { argv } = require("yargs");

const main = async () => {
  try {
    if (argv._.length) {
      const name = argv._[0];
      const target = configs.find((c) => c.name === name);

      if (!target) {
        return Promise.reject(`Configuration with the name "${name}" not found!`);
      }

      await fetch(target);
    } else {
      // Run all configs in sequential order
      for (let i = 0; i < configs.length; i++) {
        await fetch(configs[i]);
      }
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

main().catch(console.error);
