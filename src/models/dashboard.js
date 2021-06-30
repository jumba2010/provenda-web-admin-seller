import {  getSalesData,getVisitData2,
  getVisitData,getSearchData,getOfflineData,
  getOfflineChartData,getSalesTypeData,
  getSalesTypeDataOnline,getRadarData
   } from '@/services/dashboard';

   const initState = {
    visitData: [],
    visitData2: [],
    salesData: [],
    searchData: [],
    offlineData: [],
    offlineChartData: [],
    salesTypeData: [],
    salesTypeDataOnline: [],
    radarData: [],
  };

const PromotionModel = {
  namespace: 'BLOCK_NAME_CAMEL_CASE',
  state: initState,
  effects: {
    *fetch(_, { call, put }) {
      let visitdata=yield call(getVisitData);
      yield put({
        type: 'addVisitdata',
        payload: visitdata,
      });

      let visitdata2=yield call(getVisitData2);
      yield put({
        type: 'addVisitdata2',
        payload: visitdata2,
      });

      let salesdata=yield call(getSalesData);
      yield put({
        type: 'addSalesData',
        payload: salesdata,
      });

      let searchdata=yield call(getSearchData);
      yield put({
        type: 'addSearchData',
        payload: searchdata,
      });

      let salestypedata=yield call(getSalesTypeData);
      yield put({
        type: 'addSalesTypeData',
        payload: salestypedata,
      });

      let salestypedataoffline=yield call(getSalesTypeDataOnline);
      yield put({
        type: 'addSalesTypeDataOnline',
        payload: salestypedataoffline,
      });

      let offlinechartdata=yield call(getOfflineChartData);
      yield put({
        type: 'addOfflineChartData',
        payload: offlinechartdata,
      });

      let offlinedata=yield call(getOfflineData);
      yield put({
        type: 'addOfflineData',
        payload: offlinedata,
      });

      let radardata=yield call(getRadarData);
      yield put({
        type: 'addRadarData',
        payload: radardata,
      });

    },

  },
  reducers: {
    addVisitdata(state, { payload }) {
      return {
        ...state,
        visitData: payload
      };
    },

    addVisitdata2(state, { payload }) {
   
      return {
        ...state,
        visitData2: payload
      };
    },

    addSalesData(state, { payload }) {
      return {
        ...state,
        salesData: payload
      };
    },

    addSearchData(state, { payload }) {
      return {
        ...state,
        searchData: payload
      };
    },

    addOfflineChartData(state, { payload }) {
      return {
        ...state,
        offlineChartData: payload
      };
    },

    addOfflineData(state, { payload }) {
      return {
        ...state,
        offlineData: payload
      };
    },

    addRadarData(state, { payload }) {
      return {
        ...state,
        radarData: payload
      };
    },

    addSalesTypeData(state, { payload }) {
      return {
        ...state,
        salesTypeData: payload
      };
    },

    addSalesTypeDataOnline(state, { payload }) {
      return {
        ...state,
        salestypedataoffline: payload
      };
    },


    clear() {
      return initState;
    },
  },
};
export default PromotionModel;
