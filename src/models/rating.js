import { findRatingByproducts } from '@/services/rating';
const RatingModel = {
  namespace: 'rating',
  state: {
    ratings:[],
    
  },
  effects: {
    *fetchAll({ payload }, { call, put }) {
      const response = yield call(findRatingByproducts,payload);
      yield put({
        type: 'queryAll',
        payload: response,
      });
    },

  },
  reducers: {
    queryAll(state, action) {
      return {
        ...state,
        ratings: action.payload,
      };
      },
  },
};
export default RatingModel;
