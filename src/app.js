import "core-js/stable";
import "regenerator-runtime/runtime";

const { Cluster } = require("puppeteer-cluster");
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/**
 * Helper function to get bus details
 * @returns {Promise<!Promise<!Object|undefined>|!Promise<*>|XPathResult>}
 */
async function getBusDetail(page) {
  return page.evaluate(function() {
    const from = document.querySelector("#busDetailsOrigin").innerText;
    const to = document.querySelector("#busDetailsDest").innerText;

    const stops = Array.from(
      document.querySelectorAll(
        "td.routeStopStartBulletTextTD, td.stopTd",
        "#busStopTable"
      )
    ).map(td => {
      return {
        name: td.innerText,
        fn: td.getAttribute("onclick")
      };
    });

    return {
      from,
      to,
      stops
    };
  });
}

(async () => {
  let cluster;

  app.get("/", async (req, res) => {
    return res.status(200).send();
  });

  app.post("/", async (req, res) => {
    const { number, from, to, etaStop } = req.body;
    if (!number || !from || !to || !etaStop) {
      return res.status(500).send({
        success: false,
        message: "parameter incorrect"
      });
    }

    try {
      const etas = await cluster.execute({
        number,
        from,
        to,
        etaStop
      });
      console.log(etas);
      return res.send({
        success: true,
        etas
      });
    } catch (e) {
      return res.status(500).send({
        success: false,
        message: e.toString()
      });
    }
  });

  app.listen(8081, async () => {
    cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      maxConcurrency: 4,
      monitor: true,
      puppeteerOptions: {
        headless: true
      }
    });
    await cluster.task(async ({ page, data }) => {
      const bus = data;
      await page.emulateTimezone("Asia/Hong_Kong");
      await page.goto("http://search.kmb.hk/KMBWebSite/index.aspx?lang=tc", {
        waitUntil: ["load", "networkidle0"]
      });
      await page.click("#imgRouteSearchIcon");
      await page.type("#txtRoute", bus.number, { delay: 100 });
      await page.click("#routeSearchButton");
      await page.waitFor(1 * 1000);

      let busDetails = await getBusDetail(page);
      if (busDetails.from !== bus.from) {
        await page.evaluate(function() {
          exchangeRouteSearch();
        });
        await page.waitFor(1 * 1000);
        busDetails = await getBusDetail(page);
      }

      // Check if bus route matches our bus object
      if (busDetails.from !== bus.from) {
        throw new Error("Bus route incorrect, aborting");
        return;
      }

      // Check if bus stop matches our bus eta stop name
      const etaStop = busDetails.stops.find(stop => stop.name === bus.etaStop);
      if (!etaStop) {
        throw new Error("Bus eta stop incorrect, aborting");
        return;
      }
      await page.evaluate(
        etaStop => {
          eval(etaStop.etaStop.fn);
        },
        { etaStop }
      );
      await page.waitFor(1 * 1000);
      const etas = await page.evaluate(function() {
        return Array.from(
          document.querySelectorAll(
            ".esriPopupWrapper table tr table tr:not(:first-child)"
          )
        ).map(tr => tr.innerText.trim());
      });
      return etas;
    });
    console.log("App listening on port 8081!");
  });

  process.on("SIGTERM", async () => {
    console.info("SIGTERM signal received.");
    await cluster.close();
  });
})();
