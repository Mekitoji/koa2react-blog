import Koa from 'koa';
import logger from 'koa-logger';
import serve from 'koa-static';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';
import path from 'path';
import router from './routes';
import { KEYS } from './config';


const app = new Koa();

app.keys = KEYS;

if (process.env.NODE_ENV !== 'test') {
  app.use(logger());
}

app
 .use(bodyParser())
 .use(convert(serve(path.join(__dirname, 'public'))));

router(app);

export default app;
