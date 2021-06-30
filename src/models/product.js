import {
  findProductsBySucursal,
  findStockBySucursal,
  findCategoriesBySucursal
  , findUnitiesBySucursal,
  findTaxesBySucursal,
  addTax, addProduct,updateProduct,
  deleteProduct
} from '@/services/product';
const ProductModel = {
  namespace: 'product',
  state: {
    products: [],
    categories: [],
    unities: [],
    stocks: [],
    taxes: [],
    currentProduct: {},
  },
  effects: {
    *delete({ payload }, { call, put }) {
      yield call(deleteProduct, payload.product);
    },

    *update({ payload }, { call, put }) {
      yield call(updateProduct, payload.product);
    },

    *setCurrentProduct({ payload }, { call, put }){
      yield put({
        type: 'setProduct',
        payload
      });
    },

    *fetchAll({ payload }, { call, put }) {
      const response = yield call(findProductsBySucursal, payload);
      yield put({
        type: 'queryProducts',
        payload: response,
      });
    },

    *fetchCategories({ payload }, { call, put }) {
      const response = yield call(findCategoriesBySucursal, payload);
      yield put({
        type: 'queryCategories',
        payload: response,
      });
    },

    *fetchUnities({ payload }, { call, put }) {
      const response = yield call(findUnitiesBySucursal, payload);
      yield put({
        type: 'queryUnities',
        payload: response,
      });
    },

    *fetchTaxes({ payload }, { call, put }) {
      const response = yield call(findTaxesBySucursal, payload);
      yield put({
        type: 'queryTaxes',
        payload: response,
      });
    },

    *create({ payload }, { call }) {
      yield call(addProduct, payload);
    },

    *addTax({ payload }, { call, put }) {
      yield call(addTax, payload);
      const response = yield call(findTaxesBySucursal, payload.sucursalId);
      yield put({
        type: 'queryTaxes',
        payload: response,
      });
    },


  },
  reducers: {
    queryProducts(state, action) {
      return {
        ...state,
        products: action.payload,
      };
    },

    queryCategories(state, action) {
      return {
        ...state,
        categories: action.payload,
      };
    },

    queryUnities(state, action) {
      return {
        ...state,
        unities: action.payload,
      };
    },

    queryTaxes(state, action) {
      return {
        ...state,
        taxes: action.payload,
      };
    },

    add(state, action) {
      const found = state.products.find(element => element.id === action.payload.id);
      if (!found) {
        let newList = [...state.products].concat(action.payload);
        return {
          ...state,
          products: newList,
        };
      }
      else {
        return {
          ...state
        };
      }

    },

    addStock(state, action) {
      const found = state.stocks.find(element => element.id === action.payload.id);
      if (!found) {
        let newList = [...state.stocks].concat(action.payload);
        return {
          ...state,
          stocks: newList,
        };
      }
      else {
        return {
          ...state
        };
      }

    },

    update(state, action) {
      let newList = [...state.products];
      let repList = newList.map(function (item) { return item.id == action.payload.id ? action.payload : item; });
      return {
        ...state,
        products: repList,
      };
    },

    updateStock(state, action) {
      let newList = [...state.stocks];
      let repList = newList.map(function (item) { return item.id == action.payload.id ? action.payload : item; });
      return {
        ...state,
        stocks: repList,
      };
    },

    remove(state, action) {
      return {
        ...state,
        products: state.products.filter(item => item.id !== action.payload.id),
      };
    },

    removeStock(state, action) {
      return {
        ...state,
        stocks: state.stocks.filter(item => item.id !== action.payload.id),
      };
    },


    setCurrentPromotion(state, action) {
      return { ...state, currentPromotion: action.payload || {} };
    },

    setProduct(state, action) {
      return { ...state, currentProduct: action.payload || {} };
    },
  },
};
export default ProductModel;
