import { v4 as uuidv4 } from 'uuid';

export const getTraceIdConfig = (asyncStorage) => {
  return (req, res, next) => {
    const traceId = req.headers['x-request-id'] || uuidv4();
    const store = new Map().set('traceId', traceId);
    asyncStorage.run(store, () => {
      next();
    });
  };
};
