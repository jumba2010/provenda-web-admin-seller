export default function getXLSColumns(columns,marketReview){
let cols=[]
columns.forEach(col => {
  let  column ={};
  //Reviews de Mercados
  if(marketReview && col.dataIndex!='product' && col.dataIndex!='option'){
    column.title= col.title;
    column.dataIndex=col.dataIndex;
    cols.push(column);
  }

  //Reviews de produtos
  else  if(!marketReview && col.dataIndex!='market' && col.dataIndex!='option'){
    column.title= col.title;
    column.dataIndex=col.dataIndex;
    cols.push(column);
  }

  
});
    return cols;
}