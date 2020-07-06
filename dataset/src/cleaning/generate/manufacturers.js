const fs = require("fs").promises;
const path = require("path");
const xray = require("x-ray");

const x = xray();

const manual = [
  "be quiet!",
  "VisionTek",
  "KFA2",
  "NVIDIA",
  "Enermax",
  "Xigmatek",
  "Silverstone",
];

const outputDir = path.join(__dirname, "../data");

module.exports = async () => {
  try {
    let data = await x(
      "https://en.wikipedia.org/wiki/List_of_computer_hardware_manufacturers",
      ".mw-parser-output",
      ["div.div-col > ul > li > a"]
    );

    data = data
      .map((item) =>
        item
          .replace(
            /(\(.*?\)|Technology|International|Memory|Technologies|Electronics|Corporation|Interactive|,|Inc\.|Components|^G-)/gi,
            ""
          )
          .replace(/\s\s+/, " ")
          .trim()
      )
      .filter(Boolean);

    data = data.concat(manual);

    // Remove duplicates
    data = [...new Set(data)];

    await fs.mkdir(outputDir, { recursive: true });

    await fs.writeFile(
      path.join(outputDir, "manufacturers.json"),
      JSON.stringify(data, "", 2),
      "utf8"
    );
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports();
