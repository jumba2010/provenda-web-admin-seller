import moment from 'moment';
export default function getXLSData(datasource){
let data=[]
datasource.forEach(c => {
  let  client ={};
  client.name=c.name;
  client.email=c.email;
  client.phone=c.phone;
  client.timestamp=moment((new Date(parseInt(c.timestamp)))).format('DD-MM-YYYY HH:mm')
  data.push(client);
});

    return data;
}