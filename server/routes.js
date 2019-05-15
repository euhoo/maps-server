import Router from 'koa-router';
import coord from '../src/utils/coordinates';

export default (router, io) => {
  const defaultState = { coordinates: coord };

  const state = { ...defaultState };

  const apiRouter = new Router();
  apiRouter
    .get('/coordinates', (ctx) => {
      // eslint-disable-next-line no-shadow
      const { coordinates } = state;
      ctx.body = coordinates;
      ctx.status = 301;
      io.emit('allCoordinates', coordinates);
    })
    .post('/coordinates', (ctx) => {
      // eslint-disable-next-line no-shadow
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
