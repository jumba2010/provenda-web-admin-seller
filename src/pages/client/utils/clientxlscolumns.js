export default function getXLSColumns(columns){
let cols=[]
columns.forEach(col => {
  if( col.dataIndex!='option'){
    let  column ={};
    column.title= col.title;
    column.dataIndex=col.dataIndex;
    cols.push(column);
  }
});
    return cols;
}