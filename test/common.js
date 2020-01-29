import "babel-polyfill";
import { productDataSchema } from "./productSchema";
import Scraper from "../src/scraper/Scraper";
const validate = require("jsonschema").validate;
const assert = require("assert");

export const testProductSchema = async (scraper, url) => {
  const scraperCluster = new Scraper();
  await scraperCluster.initPuppeteerCluster(false, false);

  const queueHandler = scraper.handler();
  const productData = await scraperCluster.queueUrl(url, queueHandler);

  await scraperCluster.waitForCluster();
  const validation = validate(productData, productDataSchema);

  let errorMessages = [];
  if (validation.errors.length > 0) {
    console.log(validation.errors);
    errorMessages = validation.errors.map(error => {
      return error.message;
    });
  }
  return assert.equal(validation.errors.length, 0, errorMessages.join(", "));
};
