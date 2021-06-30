import moment from 'moment';
import { formatMessage } from 'umi';

// mock data

const beginDay = new Date().getTime();

export async function getSalesTypeData() {
    const salesTypeData = [
        {
          x: formatMessage({ id: 'order.delivered'}),
          y: 4544,
        },
        {
          x: formatMessage({ id: 'order.preparing'}),
          y: 3321,
        },
        {
          x: formatMessage({ id: 'order.ready'}),
          y: 3113,
        },
        {
          x: formatMessage({ id: 'order.pending'}),
          y: 2341,
        },
        {
          x: formatMessage({ id: 'order.canceled'}),
          y: 1231,
        },
        {
          x: formatMessage({ id: 'order.ontheway'}),
          y: 1231,
        },
      ];

      return salesTypeData;
}


export async function getSalesTypeDataOnline(){

    const salesTypeDataOnline = [

      {
        x: formatMessage({ id: 'order.delivered'}),
        y: 244,
      },
      {
        x: formatMessage({ id: 'order.preparing'}),
        y: 321,
      },
      {
        x: formatMessage({ id: 'order.ready'}),
        y: 311,
      },
      {
        x: formatMessage({ id: 'order.pending'}),
        y: 41,
      },
      {
        x: formatMessage({ id: 'order.ontheway'}),
        y: 121,
      },
      {
        x: formatMessage({ id: 'order.canceled'}),
        y: 111,
      },

      ];
      
    return salesTypeDataOnline;
}

export async function getSalesTypeDataOffline(){
    const salesTypeDataOffline = [
        {
          x: formatMessage({ id: 'order.delivered'}),
          y: 99,
        },
        {
          x: formatMessage({ id: 'order.preparing'}),
          y: 188,
        },
        {
          x: formatMessage({ id: 'order.ready'}),
          y: 344,
        },
        {
          x: formatMessage({ id: 'order.pending'}),
          y: 255,
        },
        {
          x: formatMessage({ id: 'order.canceled'}),
          y: 65,
        },
      ];

    return salesTypeDataOffline;
}

export async function getOfflineData(){
    const offlineData = [];
    for (let i = 0; i < 10; i += 1) {
      offlineData.push({
        name: `Stores ${i}`,
        cvr: Math.ceil(Math.random() * 9) / 10,
      });
    }
    return offlineData;
}

export async function getOfflineChartData(){
    const offlineChartData = [];
    for (let i = 0; i < 20; i += 1) {
      offlineChartData.push({
        x: new Date().getTime() + 1000 * 60 * 30 * i,
        y1: Math.floor(Math.random() * 100) + 10,
        y2: Math.floor(Math.random() * 100) + 10,
      });
    }
    return offlineChartData;
}

export async function getRadarData(){
    const radarOriginData = [
        {
          name: '个人',
          ref: 10,
          koubei: 8,
          output: 4,
          contribute: 5,
          hot: 7,
        },
        {
          name: '团队',
          ref: 3,
          koubei: 9,
          output: 6,
          contribute: 3,
          hot: 1,
        },
        {
          name: '部门',
          ref: 4,
          koubei: 1,
          output: 6,
          contribute: 5,
          hot: 7,
        },
      ];
      
      const radarData = [];
      const radarTitleMap = {
        ref: '引用',
        koubei: '口碑',
        output: '产量',
        contribute: '贡献',
        hot: '热度',
      };
      
      radarOriginData.forEach((item) => {
        Object.keys(item).forEach((key) => {
          if (key !== 'name') {
            radarData.push({
              name: item.name,
              label: radarTitleMap[key],
              value: item[key],
            });
          }
        });
      });
    return radarData;
}



export async function getVisitData() {
    const visitData = [];
    const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY[i],
  });
}
 return visitData;
}

export async function getVisitData2() {
    const visitData2 = [];
const fakeY2 = [1, 6, 4, 8, 3, 7, 2];
for (let i = 0; i < fakeY2.length; i += 1) {
  visitData2.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY2[i],
  });
}
  return visitData2;
 }

 export async function getSalesData() {
    const salesData = [];
    for (let i = 0; i < 12; i += 1) {
      salesData.push({
        x: `${i + 1}月`,
        y: Math.floor(Math.random() * 1000) + 200,
      });
    }
  return salesData;
 }
 
 export async function getSearchData() {
    const searchData = [];
    for (let i = 0; i < 50; i += 1) {
      searchData.push({
        index: i + 1,
        keyword: `Nome do Utilizador ${i}`,
        count: Math.floor(Math.random() * 1000),
        range: Math.floor(Math.random() * 100),
        status: Math.floor((Math.random() * 10) % 2),
      });
    }
   return searchData;
  }
