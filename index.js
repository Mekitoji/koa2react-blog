import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import serve from 'koa-static';
import convert from 'koa-convert';
import path from 'path';

const app = new Koa();

const router = new Router({ prefix: '/test' });
const PORT = 3000;

router.get('/', ctx =>
  ctx.body = 'test page');

app
 .use(logger())
 .use(convert(serve(path.join(__dirname, 'public'))))
 .use(router.routes())
 .use(router.allowedMethods());

app.listen(PORT, () => console.log(`Server start at port ${PORT}`));

export default app;
