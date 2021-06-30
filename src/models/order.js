import { findOrders, cancelOrder,confirmOrder } from '@/services/order';
const OrderModel = {
  namespace: 'order',
  state: {
    orders:[],
    currentOrder:{},
  },
  effects: {
    *fetch({ payload }, { call, put }) {
        const response = yield call(findOrders,payload);
        yield put({
          type: 'queryOrders',
          payload: response,
        });
      },
    
    *confirm({ payload }, { call }) {
      yield call(confirmOrder,payload);
  
    },

    *cancel({ payload }, { call }) {
      yield call(cancelOrder,payload);
    },
  },
  reducers: {
    queryOrders(state, action) {
      return {
        ...state,
        orders: action.payload,
      };
      },

      add(state, action) {
        const found = state.orders.find(element => element.id === action.payload.id);
        if(!found){ 
        let newList=[...state.orders].concat(action.payload);
        return {
          ...state,
          orders: newList,
        };
        
      }
      else {
        return {
          ...state
        };
                      }
        },

        update(state, action) {
          let newList=[...state.orders];
         let repList= newList.map(function(item) { return item.id == action.payload.id ? action.payload : item; });
          return {
            ...state,
            orders: repList,
          };
          },
          
          remove(state, action) {
            return {
              ...state,
              sales: state.orders.filter(item => item.id !== action.payload.id),
            };
            },
  },
};

export default OrderModel;
