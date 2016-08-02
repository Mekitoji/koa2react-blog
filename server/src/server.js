import Koa from 'koa';
import logger from 'koa-logger';
import serve from 'koa-static';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';
import { resolve } from 'path';
import router from './routes';
import { KEYS, db } from './config';
import session from 'koa-generic-session';
import MongoStore from 'koa-generic-session-mongo';
import './lib/auth';
import passport from 'koa-passport';

const app = new Koa();

app.keys = KEYS;

app.use(convert(session({
  store: new MongoStore({ db }),
})));

if (process.env.NODE_ENV !== 'test') {
  app.use(logger());
}

app
 .use(bodyParser())
 .use(convert(serve(resolve(__dirname, '../public'))));

app.use(passport.initialize());
app.use(passport.session());

router(app);

export default app;
