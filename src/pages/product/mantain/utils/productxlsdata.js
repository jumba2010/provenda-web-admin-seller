import categories from '../../utils/categories';

export default function getXLSData(datasource){
let data=[]
datasource.forEach(p => {
  let  product ={};
  product.name=p.name;
  product.descriproduct=p.descriproduct;
  product.sellprice=p.sellprice;
  product.promotionalprice=p.promotionalprice;
  product.category=categories.filter((c)=>c.id===p.category.id)[0].name
  product.unity=p.unity.name;
  product.availablequantity=String(p.availablequantity).trim();
  data.push(product);
});

    return data;
}