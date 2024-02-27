const path = require(`path`);
const express = require(`express`);
const app = express(); //invoke framework

const apiController = require('./apiController');

const PORT = 3000;

app.use(express.json()); //app.use catches every signal regardless of method (get, patch, put, post, delete) we will parse json (data form between languages)

// app.use(express.static(path.resolve(__dirname, "../dist"))); //serving bundled static files

// handles request from frontend for API data
app.get('/subway', apiController.getSubwayInfo, (req, res, next) => {
  console.log(`inside of /subway route`);
  res.status(200).send(res.locals.data);
});

//handles request from frontend

app.get('/', (req, res, next) => {
  console.log(`inside of / route`);
  res.status(200).sendFile(path.resolve(__dirname, '../public/index.html'));
});

//handle undesignated paths
app.use('*', (req, res) => {
  res.sendStatus(404);
});

//Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
