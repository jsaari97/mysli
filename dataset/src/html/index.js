const fs = require("fs").promises;
const path = require("path");
const { fetchHtml } = require("./fetch");
const { stripHtml } = require("./cleanup");

const main = async (url) => {
  try {
    const data = await fetchHtml(url);

    const minified = await stripHtml(data);

    const [name] = url.split("/").filter(Boolean).reverse();

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

main("https://pcpartpicker.com/products/memory/");
