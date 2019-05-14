import Router from 'koa-router';

export default (router, io) => {
  const defaultState = { coordinates: [] };

  const state = { ...defaultState };

  const apiRouter = new Router();
  apiRouter
    .get('/coordinates', (ctx) => {
      const { coordinates } = state;
      ctx.body = coordinates;
      ctx.status = 301;
      console.log(coordinates);
      io.emit('allCoordinates', coordinates);
    })
    .post('/coordinates', (ctx) => {
      const coordinates = ctx.request.body;
      state.coordinates.push(...coordinates);
      ctx.status = 201;
      ctx.body = coordinates;
      io.emit('newCoordinates', coordinates);
    });

  return router
    .get('root', '/', (ctx) => {
      ctx.render('index', { gon: state });
    })
    .use('/api/v1', apiRouter.routes(), apiRouter.allowedMethods());
};
