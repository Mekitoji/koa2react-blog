import Koa from 'koa';
import logger from 'koa-logger';
import serve from 'koa-static';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';
import path from 'path';
import './lib/mongoose';
import router from './routes';

const app = new Koa();

const PORT = 3000;

app
 .use(logger())
 .use(bodyParser())
 .use(convert(serve(path.join(__dirname, 'public'))));

router(app);

app.listen(PORT, () => console.log(`Server start at port ${PORT}`));
