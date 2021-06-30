import getStatus from './status';
import moment from 'moment';
export default function getXLSData(datasource){
let data=[]
datasource.forEach(p => {
  let  payment ={};
  payment.id=p.id;
  payment.client=p.client.name;
  payment.payment=getStatus(p.payment.status);
  payment.itemsCount=p.itemsCount;
  payment.total=p.total;
  payment.remarks=p.remarks;
  payment.paymentDate=p.paymentDate?moment((new Date(parseInt(p.paymentDate)))).format('DD-MM-YYYY HH:mm'):''
  data.push(payment);
});

    return data;
}