const { text } = require('body-parser');
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');

const URL =
  'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fsubway-alerts';
const URL2 =
  'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fnyct_ene.xml';
const key = 'IWddVccjk6aIOEuV87rGV8p2551sWLzI3y6O65yu';

const ApiController = {
  getAccInfo(req, res, next) {
    fetch(URL2, {
      headers: { 'x-api-key': key },
    })
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        //DOM parser
        console.log('Second then res ', response);
        const parser = new DOMParser(); //parsing data to new Dom
        const doc = parser.parseFromString(response, 'text/xml');

        //navigate and query this document using standard DOM methods

        return next();
      })
      .catch((err) =>
        next({
          log: 'Express error handler caught accessibility error',
          status: 500,
          message: { err: 'An error occurred' },
        })
      );
  },

  async getSubwayInfo(req, res, next) {
    try {
      response = await fetch(URL, {
        headers: { 'x-api-key': key },
      });

      const buffer = await response.arrayBuffer();
      const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
        new Uint8Array(buffer)
      );

      const currentTime = Math.floor(Date.now() / 1000);
      const routesIndex = {
        1: 0,
        2: 1,
        3: 2,
        4: 3,
        5: 4,
        6: 5,
        7: 6,
        A: 7,
        C: 8,
        E: 9,
        B: 10,
        D: 11,
        F: 12,
        M: 13,
        G: 14,
        L: 15,
        N: 16,
        Q: 17,
        R: 18,
        W: 19,
      };
      const routes = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        'A',
        'C',
        'E',
        'B',
        'D',
        'F',
        'M',
        'G',
        'L',
        'N',
        'Q',
        'R',
        'W',
      ];

      const data = routes.map((el) => [el]);

      const alertsArr = [];
      for (let i = 0; i < feed.entity.length; i++) {
        if (feed.entity[i].alert.informedEntity[0].routeId)
          alertsArr.push(feed.entity[i].alert);
      }

      for (let j = 0; j < alertsArr.length; j++) {
        const alertObj = {
          message: alertsArr[j].headerText.translation[0].text,
          start: '',
          end: '',
        };

        const firstStartTime = alertsArr[j].activePeriod[0].start.low;
        firstStartTime !== 0
          ? (alertObj.start += dateString(
              new Date(alertsArr[j].activePeriod[0].start.low * 1000)
            ))
          : (alertObj.start += 'Unknown');

        const lastEndTime =
          alertsArr[j]?.activePeriod[alertsArr[j].activePeriod.length - 1]?.end
            .low;

        lastEndTime !== 0 && lastEndTime > currentTime
          ? (alertObj.end += dateString(
              new Date(
                alertsArr[j]?.activePeriod[alertsArr[j].activePeriod.length - 1]
                  ?.end.low * 1000
              )
            ))
          : lastEndTime === 0
          ? (alertObj.end += 'Unknown')
          : alertObj.end;

        for (let k = 0; k < alertsArr[j].informedEntity.length; k++) {
          if (data[routesIndex[alertsArr[j].informedEntity[k].routeId]])
            data[routesIndex[alertsArr[j].informedEntity[k].routeId]].push(
              alertObj
            );
        }
      }
      res.locals.data = data;
      return next();
    } catch (err) {
      return next({
        log: 'Express error handler caught getSubwayInfo error:' + err,
        status: 500,
        message: { err: 'An error occurred' },
      });
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

  if (pm) string += ' PM';
  else string += ' AM';

  return string;
}

module.exports = ApiController;
