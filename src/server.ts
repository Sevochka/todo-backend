import express from 'express';
import cors from 'cors';

const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

app.use(cookieParser());

/*
* Настраиваем CORS
*/
const corsOptions = {
  origin: /http:\/\/localhost:\d*/,
  credentials: true,
};
app.use(cors(corsOptions));
// CORS для preflight-запросов
app.options('*', cors(corsOptions));

const expressServer = app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

export {
  app,
  expressServer,
};
