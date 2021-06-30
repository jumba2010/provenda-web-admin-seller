import { findPayments, confirmPayment,refundPayment } from '@/services/sale';
const OrderModel = {
  namespace: 'sale',
  state: {
    sales:[],
    refundedlist:[] 
  },
  effects: {
    *fetch({ payload }, { call, put }) {
        const response = yield call(findPayments,payload);
        yield put({
          type: 'querySales',
          payload: response,
        });
      },
    
    *refund({ payload }, { call }) {
      yield call(refundPayment,payload);
    },

    *confirm({ payload }, { call }) {
      yield call(confirmPayment,payload);
    },
  },
  reducers: {
    querySales(state, action) {
      return {
        ...state,
        sales: action.payload,
      };
      },

      add(state, action) {
        const found = state.sales.find(element => element.id === action.payload.id);
        if(!found){
          let newList=[...state.sales].concat(action.payload);
          return {
            ...state,
            sales: newList,
          };
        }
        else {
          return {
            ...state
          };
         }
       
        },

        update(state, action) {
          let newList=[...state.sales];
         let repList= newList.map(function(item) { return item.id == action.payload.id ? action.payload : item; });
          return {
            ...state,
            sales: repList,
          };
          },

          remove(state, action) {
            return {
              ...state,
              sales: state.sales.filter(item => item.id !== action.payload.id),
            };
            },
    
          addrefunded(state, action) {
            const found = state.refundedlist.find(element => element.id === action.payload.id);
           if(!found){
            let newList=[...state.refundedlist].concat(action.payload);
            return {
              ...state,
              refundedlist: newList,
            };
          }
          else{
            return {
              ...state
            };

          }

            },
  },
};

export default OrderModel;
