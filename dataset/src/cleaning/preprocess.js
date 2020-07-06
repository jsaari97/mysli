const R = require("ramda");
const manufacturerList = require("./data/manufacturers.json");
const miscellaneousList = require("./data/miscellaneous.json");
const { replaceList, removeSpecialChars } = require("./utils");

const filterManufacturers = replaceList(manufacturerList);
const filterMisc = replaceList(miscellaneousList);

module.exports = (item) => {
  const result = R.pipe(
    filterManufacturers,
    filterMisc,
    removeSpecialChars
  )(item);

  return result;
};
