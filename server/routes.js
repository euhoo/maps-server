import Router from 'koa-router';

export default (router, io) => {
  const defaultState = {
    coordinates: [
      { lat: 39.302237, lng: 47.834813 },
      { lat: 1.880592, lng: 172.991099 },
      { lat: 13.466297, lng: 144.746925 },
      { lat: 49.725608, lng: 84.274505 },
      { lat: 39.666659, lng: 20.854704 },
      { lat: -17.743084, lng: -43.130488 },
      { lat: 49.198998, lng: -2.081082 },
      { lat: 1.880592, lng: 172.991099 },
    ],
  };

  const state = { ...defaultState };

  const apiRouter = new Router();
  apiRouter
    .get('/coordinates', (ctx) => {
      const { coordinates } = state;
      ctx.body = coordinates;
      ctx.status = 301;
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
