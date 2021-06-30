import { findClients } from '@/services/client';
const ClientModel = {
  namespace: 'client',
  state: {
    clients:[],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
        const response = yield call(findClients,payload);
        yield put({
          type: 'queryClients',
          payload: response,
        });
      },
  },

  reducers: {
    queryClients(state, action) {
      return {
        ...state,
        clients: action.payload,
      };
      },
  },
};
export default ClientModel;
