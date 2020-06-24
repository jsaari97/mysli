const puppeteer = require("puppeteer");

// const MAX = 10;

/**
 * Fetch HTML data for given category
 * @param {string} url
 * @returns {Promise<string>}
 */
const fetchHtml = async (url) => {
  let browser = null;

  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();

    const data = [];

    // Block images and css
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      switch (request.resourceType()) {
        case "image":
        case "stylesheet":
          request.abort();
          break;
        default:
          request.continue();
          break;
      }
    });

    await page.goto(url);

    let maxPage = 0;

    const handlePage = async (cursor) => {
      const response = await page.waitForResponse(`${url}fetch/`);

      await page.waitFor(800);

      const json = await response.json();

      data.push(json.result.html);

      // get total number of pages
      if (!maxPage) {
        maxPage = await page.evaluate(() => {
          const node = document.querySelector(
            ".pagination > li:last-child > a"
          );

          return parseInt(node.innerHTML);
        });

        maxPage = 2;
      }

      if (cursor >= maxPage) {
        return;
      }

      const [pagination] = await page.$x(
        `//ul[contains(@class, 'pagination')]/li/a[contains(., '${
          cursor + 1
        }')]`
      );

      if (pagination) {
        await pagination.click();
        await handlePage(cursor + 1);
      }
    };

    await handlePage(1);

    await browser.close();

    return Promise.resolve(data.join(""));
  } catch (error) {
    if (browser) {
      await browser.close();
    }

    return Promise.reject(error);
  }
};

exports.fetchHtml = fetchHtml;
