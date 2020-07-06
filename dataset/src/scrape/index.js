const fs = require("fs").promises;
const path = require("path");
const xray = require("x-ray");
const { preProcess, postProcess } = require("../cleaning");

const x = xray();

const inputDir = path.join(process.cwd(), "/html");
const outputDir = path.join(process.cwd(), "/data");

module.exports = async ({ name, shape, parse }) => {
  try {
    const html = await fs.readFile(path.join(inputDir, `${name}.html`), "utf8");

    let data = await x(html, "tr", shape);

    if (typeof data[0] === "object") {
      data = data.map((item) => Object.values(item).join(" "));
    }

    data = data.map(preProcess);

    if (parse) {
      data = parse(data);
    }

    data = data.map(postProcess).filter(Boolean);

    // Remove duplicates
    data = [...new Set(data)];

    await fs.mkdir(outputDir, { recursive: true });

    await fs.writeFile(
      path.join(outputDir, `${name}.json`),
      JSON.stringify(data, "", 2),
      "utf8"
    );
  } catch (error) {
    return Promise.reject(error);
  }
};
