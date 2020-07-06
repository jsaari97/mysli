const puppeteer = require("puppeteer");

const MAX = 10;

/**
 * Fetch HTML data for given category
 * @param {string} url
 * @returns {Promise<string>}
 */
const fetchHtml = async (url) => {
  const bareUrl = url.split("#")[0];

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
      try {
        const response = await page.waitForResponse(`${bareUrl}fetch/`);

        await page.waitFor(800 + Math.random() * 800);

        const json = await response.json();

        data.push(json.result.html);

        // get number of pages to fetch
        if (!maxPage) {
          maxPage = await page.evaluate(() => {
            const node = document.querySelector(
              ".pagination > li:last-child > a"
            );

            return parseInt(node.innerHTML);
          });

          maxPage = Math.min(maxPage, MAX);
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
      } catch (error) {
        return Promise.reject(error);
      }
    };

    await handlePage(1);

    return data.join("");
  } catch (error) {
    return Promise.reject(error);
  } finally {
    if (browser) {
      browser.close();
    }
  }
};

exports.fetchHtml = fetchHtml;
