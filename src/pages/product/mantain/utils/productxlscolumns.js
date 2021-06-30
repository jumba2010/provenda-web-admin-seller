export default function getXLSColumns(columns){
let cols=[]
columns.forEach(col => {
  if(col.dataIndex!='filenames' && col.dataIndex!='option'){
    let  column ={};
    if(col.dataIndex==='sellprice' || col.dataIndex==='promotionalprice'){
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