import { fetchMarketReviews, fetchProductReviews } from '@/services/review';
const ReviewModel = {
  namespace: 'review',
  state: {
    marketReviews:[],
    productReviews:[],
  },
  effects: {
    *fetchMarketReviews({ payload }, { call, put }) {
        const response = yield call(fetchMarketReviews,payload);
        yield put({
          type: 'queryMarketReviews',
          payload: response,
        });
      },

      *fetchProductReviews({ payload }, { call, put }) {
        const response = yield call(fetchProductReviews,payload);
        yield put({
          type: 'queryProductReviews',
          payload: response,
        });
      },
 

  },
  reducers: {
    queryMarketReviews(state, action) {
      return {
        ...state,
        marketReviews: action.payload,
      };
      },

      queryProductReviews(state, action) {
        return {
          ...state,
          productReviews: action.payload,
        };
        }, 
  },
};
export default ReviewModel;
