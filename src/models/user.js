import { signup,
  updateUserPassword,sendVerificationEmail,
  sendPasswordResetEmail,updateUser,signin,queryCurrent,query } from '@/services/user';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {

    *create({payload}, { call, put }) {
      yield call(signup,payload);
    
    },

    *update({payload}, { call, put }) {
    let response=  yield call(updateUser,payload);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
