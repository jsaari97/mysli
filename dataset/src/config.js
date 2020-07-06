const scrape = require("./scrape");

module.exports = [
  {
    name: "cpu",
    shape: ["td:nth-child(2) a p"],
  },
];

scrape(module.exports[0]);
