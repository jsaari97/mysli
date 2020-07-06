const scrape = require("../scrape");
const configs = require("../config");
const { argv } = require("yargs");

const main = async () => {
  try {
    if (argv._.length) {
      const name = argv._[0];
      const target = configs.find((c) => c.name === name);

      if (!target) {
        return Promise.reject(
          `Configuration with the name "${name}" not found!`
        );
      }

      await scrape(target);
    } else {
      await Promise.all(configs.map(scrape));
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

main().catch(console.error);
