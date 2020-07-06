const fs = require("fs").promises;
const path = require("path");
const xray = require("x-ray");

const x = xray();

const inputDir = path.join(process.cwd(), "/html");
const outputDir = path.join(process.cwd(), "/data");

module.exports = async ({ name, shape, parse }) => {
  try {
    const html = await fs.readFile(path.join(inputDir, `${name}.html`), "utf8");

    let data = await x(html, "tr", shape);

    if (parse) {
      data = parse(data);
    }

    await fs.mkdir(outputDir, { recursive: true });

    await fs.writeFile(
      path.join(outputDir, `${name}.json`),
      JSON.stringify(data, "", 2),
      "utf8"
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
