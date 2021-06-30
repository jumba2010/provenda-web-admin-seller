import getStatus from './status';

import moment from 'moment';
export default function getXLSData(datasource){
let data=[]
datasource.forEach(o => {
  let  order ={};
  order.id=o.id;
  order.client=o.client.name;
  order.status=getStatus(o.status.status);
  order.itemsCount=o.itemsCount;
  order.total=o.total;
  order.remarks=o.remarks;
  order.updatedAt=moment((new Date(parseInt(o.updatedAt)))).format('DD-MM-YYYY HH:mm')
  data.push(order);
});

    return data;
}
