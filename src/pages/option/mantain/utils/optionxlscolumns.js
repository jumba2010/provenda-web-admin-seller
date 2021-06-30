export default function getXLSColumns(columns){
let cols=[]
columns.forEach(col => {
  if(col.dataIndex!='imageUrl' && col.dataIndex!='option'){
    let  column ={};
    column.title=col.dataIndex==='price'?col.title+' (MZN)':col.title;;
    column.dataIndex=col.dataIndex;
    cols.push(column);
  }
});
    return cols;
}