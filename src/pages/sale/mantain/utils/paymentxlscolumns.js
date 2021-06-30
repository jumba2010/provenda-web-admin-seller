export default function getXLSColumns(columns){
let cols=[]
columns.forEach(col => {
  if(col.dataIndex!='imageURL' && col.dataIndex!='option'){
    let  column ={};
    if(col.dataIndex==='total' ){
      column.title=  col.title+' (MZN)'
    }
    
    else{
      column.title= col.title;
    }
  
    column.dataIndex=col.dataIndex;
    cols.push(column);
  }
});
    return cols;
}