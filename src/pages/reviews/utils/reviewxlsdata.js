
import moment from 'moment';
export default function getXLSData(datasource){
let data=[]
datasource.forEach(r => {
  let  review ={};

  if(r.product){
    review.product=r.product.name;
  }
  review.review=r.review;

  if(r.market){
    review.market=r.market.name;
  }
  
  review.rate=r.rate;
  review.user=r.user.name;
  review.id=moment((new Date(parseInt(r.id)))).format('DD-MM-YYYY HH:mm')
  data.push(review);
});

    return data;
}