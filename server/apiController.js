const { text } = require("body-parser");
const GtfsRealtimeBindings = require("gtfs-realtime-bindings");
// var parseString = require('xml2js').parseString
const { DOMParser } = require('xmldom')
// const { JSDOM } = require("jsdom");

const URL =
  "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fsubway-alerts";
const URL2 =
  "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fnyct_ene.xml";
const key = "IWddVccjk6aIOEuV87rGV8p2551sWLzI3y6O65yu";

const ApiController = {
  getAccInfo(req, res, next) {
    
    fetch(URL2, {
      headers: { "x-api-key": key },
    })
      .then((response) => response.text())
      .then((response) => {
        //Parsing Data
        const parser = new DOMParser(); 
        const data = parser.parseFromString(response, "text/xml")

        //creating an array of element tags. Outage -> (station, trainNo, outageDates, ADA). All buried in firstChild.data
        const outages = Array.from(data.getElementsByTagName("outage")).map((outageElement) => {
          return {
            station: outageElement.getElementsByTagName("station")[0].firstChild.data,
            trainno: outageElement.getElementsByTagName("trainno")[0].firstChild.data,
            outageDates: outageElement.getElementsByTagName("outagedate")[0].firstChild.data,
            estimatedreturntoservice: outageElement.getElementsByTagName("estimatedreturntoservice")[0].firstChild.data,
            ADA: outageElement.getElementsByTagName("ADA")[0].firstChild.data
          };
      });

        //testing console logs
        // const outage = Array.from(data.getElementsByTagName('station')).map(element => element.firstChild.data) 
        // console.log(data.getElementsByTagName('outage')[0])
        res.locals.data = outages;

        return next();
      })
      .catch((err) => {
        console.log("this is the error", err);
        return next({
          log: "Express error handler caught accessibility error",
          status: 500,
          message: { err: "An error occurred" },
        });
      });
  },

  async getSubwayInfo(req, res, next) {
    try {
      response = await fetch(URL, {
        headers: { "x-api-key": key },
      });

      const buffer = await response.arrayBuffer();
      const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
        new Uint8Array(buffer)
      );

      const currentTime = Math.floor(Date.now() / 1000);
      const routes = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "A",
        "C",
        "E",
        "B",
        "D",
        "F",
        "M",
        "G",
        "L",
        "N",
        "Q",
        "R",
        "W",
      ];
      const data = [];

      routes.forEach((route) => {
        const info = [route];
        const cache = {};

        feed.entity.forEach((element) => {
          element.alert.informedEntity.forEach((x) => {
            if (x.routeId === route) {
              element.alert.activePeriod.forEach((y) => {
                if (y.start.low < currentTime) {
                  if (y.end.low === 0 || y.end.low > currentTime) {
                    const message =
                      element.alert.headerText.translation[0].text;
                    const start = new Date(y.start.low * 1000);
                    const end = new Date(y.end.low * 1000);

                    if (!cache[message]) {
                      const obj = {
                        message: message,
                        start: dateString(start),
                      };
                      if (y.end.low !== 0) obj.end = dateString(end);
                      else obj.end = "Unknown";
                      info.push(obj);
                      cache[message] = true;
                    }
                  }
                }
              });
            }
          });
        });
        data.push(info);
      });

      res.locals.data = data;
      return next();
    } catch {
      return next((error) => console.log(`Error fetching data`, error));
    }
  },
};

function dateString(date) {
  let string = `${date.getMonth() + 1}/${date.getDate()} `;
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let pm = false;

  if (hours === 12) {
    pm = true;
    string += `12:`;
  } else if (hours > 12) {
    pm = true;
    string += `${hours % 12}:`;
  } else string += `${hours}:`;

  if (minutes < 10) string += `0${minutes}`;
  else string += `${minutes}`;

  if (pm) string += " PM";
  else string += " AM";

  return string;
}

module.exports = ApiController;
