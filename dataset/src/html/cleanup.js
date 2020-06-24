const fs = require("fs").promises;
const path = require("path");
const parser = require("fast-xml-parser");
const xpath = require("xpath");
const XMLDom = require("xmldom");

const DOMParser = new XMLDom.DOMParser({
  errorHandler: {
    warning: null,
    error: console.error,
    fatalError: console.error,
  },
});
const Serializer = new XMLDom.XMLSerializer();

/**
 * Removes attributes and correctly closes tags
 * @param {string} input HTML data
 * @returns {string}
 */
const cleanTags = (input) => {
  return new parser.j2xParser().parse(parser.parse(input));
};

/**
 * Remove redundant data from HTML files.
 * @param {string} data HTML data
 * @returns {Promise<string>}
 */
const stripHtml = async (data) => {
  try {
    const root = DOMParser.parseFromString(data);

    const removeTags = (selector) => {
      const nodes = xpath.select(selector, root);

      nodes.forEach((n) => {
        n.parentNode.removeChild(n);
      });
    };

    removeTags("//div[contains(@class,'td__rating')]");
    removeTags("//td[contains(@class,'td__rating')]");
    removeTags("//svg");
    removeTags("//button");
    removeTags("//input");
    removeTags("//img");
    removeTags("//h6");

    const serialized = Serializer.serializeToString(root);

    const result = cleanTags(serialized);

    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.stripHtml = stripHtml;
