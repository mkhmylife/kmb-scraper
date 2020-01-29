import "babel-polyfill";
import SeoulPassScraper from "../src/scraper/SeoulPassScraper";
import { testProductSchema } from "./common";
import MusementScraper from "../src/scraper/MusementScraper";
import TripGuruScraper from "../src/scraper/TripGuruScraper";
import KKDayScraper from "../src/scraper/KKDayScraper";
import TripScraper from "../src/scraper/TripScraper";

describe("Scraper Data Return Test", function() {
  this.timeout(60 * 5 * 1000);
  it("should scrape seoulpass product correctly", async () => {
    const url =
      "https://www.seoultravelpass.com/en/products/393-global-seoul-mate-gangnam-1-1-language-exchange-gathering";
    const scraper = new SeoulPassScraper();
    return await testProductSchema(scraper, url);
  });
  it("should scrape tripguru product correctly", async () => {
    const url =
      "https://thetripguru.com/tour/hike-to-discover-balis-gratests-waterfalls";
    const scraper = new TripGuruScraper();
    return await testProductSchema(scraper, url);
  });
  it("should scrape kkday product correctly", async () => {
    const url = "https://www.kkday.com/zh-hk/product/5019";
    const scraper = new KKDayScraper();
    return await testProductSchema(scraper, url);
  });
  it("should scrape musement product correctly", async () => {
    const url =
      "https://www.musement.com/us/pisa/pisa-leaning-tower-and-cathedral-skip-the-line-tickets-77112/";
    const scraper = new MusementScraper();
    return await testProductSchema(scraper, url);
  });
  it("should scrape trip product correctly", async () => {
    const url = "https://hk.trip.com/things-to-do/detail/11166561";
    const scraper = new TripScraper();
    return await testProductSchema(scraper, url);
  });
});
