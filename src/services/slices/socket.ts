import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SliceActions, TResponseOrders } from "../../utils/types";

type TSocketState = {
  data: null | TResponseOrders;
};

const initialState: TSocketState = {
  data: null,
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<TSocketState['data']>) => {
      state.data = action.payload;
    },
    wsStub: (state, action) => {
      console.log(action.payload);
    },
  },
});

// export const { setData, wsStub } = socketSlice.actions;

export default socketSlice.reducer;

export type TSocketActions = SliceActions<typeof socketSlice.actions>;

export type TWsActions = {
  [key in
    'wsConnect' |
    'wsDisconnect' |
    'wsOnOpen' |
    'wsOnError' |
    'wsOnMessage' |
    'wsOnClose'
  ]: string;
};

export const wsActions: TWsActions = {
  wsConnect: '_WS_CONNECT',
  wsDisconnect: '_WS_DISCONNECT',
  wsOnOpen: 'socket/wsStub',
  wsOnError: 'socket/wsStub',
  wsOnMessage: 'socket/setData',
  wsOnClose: 'socket/wsStub',
};
