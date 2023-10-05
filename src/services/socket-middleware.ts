import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState, TAppActions } from './store';
import { refreshTokens } from '../utils/api';
import { TWsActions } from './slices/socket';

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let wsUrl = '';

    return (next) => (action: TAppActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsConnect, wsDisconnect, wsOnOpen, wsOnError, wsOnMessage, wsOnClose } = wsActions;

      if (type === wsConnect) {
        wsUrl = action.payload;
        socket = new WebSocket(wsUrl);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: wsOnOpen, payload: event.type });
        };

        socket.onerror = (event) => {
          dispatch({ type: wsOnError, payload: event.type });
        };

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.message === 'Invalid or missing token') {
            (async () => {
              const refreshData = await refreshTokens();
              if (!refreshData.success) {
                return Promise.reject(refreshData);
              }
              // const newWsUrl = wsUrl.replace(/\?token=.+/, '?token=' + refreshData.accessToken.replace('Bearer ', ''));
              const newWsUrl = new URL(wsUrl);
              newWsUrl.searchParams.set('token', refreshData.accessToken.replace('Bearer ', ''));
              dispatch({ type: wsConnect, payload: newWsUrl.href });
            })();
          } else {
            dispatch({ type: wsOnMessage, payload: data });
          }
        };

        socket.onclose = (event) => {
          dispatch({ type: wsOnClose, payload: event.type });
        };

//      if (type === WS_SEND) {
//        socket.send(JSON.stringify(wsMessage));
//      };

        if (type === wsDisconnect) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  }) as Middleware;
};
