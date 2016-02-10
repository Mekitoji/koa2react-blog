import Router from 'koa-router';
import commentCtrl from '../controllers/comment';

function reg(app) {
  const prefix = '/comment';
  const router = new Router({ prefix });

  router.get('/', commentCtrl.all);
  router.post('/', commentCtrl.post);
  router.get('/:id', commentCtrl.get);
  router.put('/:id', commentCtrl.put);
  router.delete('/:id', commentCtrl.delete);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}

export default reg;
