import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from './store';
import { setData, wsStub } from './slices/socket-data';
import { refreshToken } from '../utils/api';

export const socketMiddleware = (): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let wsUrl = '';

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;

      if (type === 'socket/connect') {
        wsUrl = action.wsUrl;
        socket = new WebSocket(wsUrl);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch(wsStub(event.type));
        };

        socket.onerror = (event) => {
          dispatch(wsStub(event.type));
        };

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.message === 'Invalid or missing token') {
            (async () => {
              const refreshData = await refreshToken();
              if (!refreshData.success) {
                return Promise.reject(refreshData);
              }
              // const newWsUrl = wsUrl.replace(/\?token=.+/, '?token=' + refreshData.accessToken.replace('Bearer ', ''));
              const newWsUrl = new URL(wsUrl);
              newWsUrl.searchParams.set('token', refreshData.accessToken.replace('Bearer ', ''));
              dispatch({ type: 'socket/connect', wsUrl: newWsUrl.href });
            })();
          } else {
            dispatch(setData(data));
          }
        };

        socket.onclose = (event) => {
          dispatch(wsStub(event.type));
        };

//      if (type === 'socket/send') {
//        socket.send(JSON.stringify(wsMessage));
//      };

        if (type === 'socket/disconnect') {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  }) as Middleware;
};
