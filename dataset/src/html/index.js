const fs = require("fs").promises;
const path = require("path");
const { fetchHtml } = require("./fetch");
const { stripHtml } = require("./cleanup");

module.exports = async ({ name, product, query }) => {
  try {
    const identifier = product || name;

    const url = `https://pcpartpicker.com/products/${identifier}/${
      query ? `#${query}` : ""
    }`;

    const data = await fetchHtml(url);

    const minified = await stripHtml(data);

    await fs.mkdir(path.join(process.cwd(), "/html"), { recursive: true });

    await fs.writeFile(
      path.join(process.cwd(), "/html", `${name}.html`),
      minified,
      "utf8"
    );
  } catch (error) {
    return Promise.reject(error);
  }
};
