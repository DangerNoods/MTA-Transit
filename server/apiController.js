const GtfsRealtimeBindings = require('gtfs-realtime-bindings');

const URL =
  'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fsubway-alerts';
const key = 'IWddVccjk6aIOEuV87rGV8p2551sWLzI3y6O65yu';

const ApiController = {
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
      const data = [];

      routes.forEach((route) => {
        const info = [route];

        feed.entity.forEach((element) => {
          const errMsg = {
            message: element.alert.headerText.translation[0].text,
            start: '',
            end: '',
          };
          element.alert.activePeriod.forEach((y) => {
            if (y.start.low < currentTime) {
              if (y.end.low === 0 || y.end.low > currentTime) {
                errMsg.start = dateString(new Date(y.start.low * 1000));

                if (y.end.low !== 0)
                  errMsg.end = dateString(new Date(y.end.low * 1000));
                else errMsg.end = 'Unknown';
              }
            }
            element.alert.informedEntity.forEach((x) => {
              for (let i = 0; i < routes.length; i++) {
                if (x.routeId === routes[i]) {
                  data.push(errMsg);
                }
              }
            });
          });
        });
        data.push(info);
      });

      res.locals.data = feed;
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

  if (pm) string += ' PM';
  else string += ' AM';

  return string;
}

module.exports = ApiController;
