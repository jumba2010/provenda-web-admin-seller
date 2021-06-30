import groups from '../../utils/optiongroup';

export default function getXLSData(datasource){
let data=[]
datasource.forEach(op => {
  let  option ={};
  option.name=op.name;
  option.description=op.description;
  option.price=op.price;
  option.group=groups.filter((op)=>op.code===op.code)[0].name;
  option.product=op.product.name;
  data.push(option);
});

    return data;
}