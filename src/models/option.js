import { findOptions, addOption,inativateOption } from '@/services/option';
const OptionModel = {
  namespace: 'option',
  state: {
    options:[],
   
  },
  effects: {
    *fetch({ payload }, { call, put }) {
        const response = yield call(findOptions,payload);
        yield put({
          type: 'queryOptions',
          payload: response,
        });
      },
    
    *create({ payload }, { call,put }) {
      const response = yield call(addOption,payload);
      yield put({
        type: 'addToList',
        payload: response,
      });
    },

  },
  reducers: {
    queryOptions(state, action) {
      return {
        ...state,
        options: action.payload,
      };
      },
      addToList(state, action) {
        let newList=[...options].concat(action.payload);
        return {
          ...state,
          options: newList,
        };
        },
  },
};
export default OptionModel;
