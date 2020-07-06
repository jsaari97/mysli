const fetchManufacturers = require("./manufacturers");

const main = async () => {
  try {
    await fetchManufacturers();
  } catch (error) {
    return Promise.reject(error);
  }
};

main();
