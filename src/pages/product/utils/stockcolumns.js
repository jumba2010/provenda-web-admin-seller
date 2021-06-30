import { formatMessage } from 'umi';
import {Typography,Badge} from 'antd';
import moment from 'moment';
const { Text, Link } = Typography;

const stockcolumns = [
  
    {
      title: formatMessage({ id: 'stock.product'}),
      dataIndex: 'productname',
      valueType: 'text',
      render:(text)=><Text strong>{text}</Text>,
    },
    
    {
      title: formatMessage({ id: 'stock.quantity'}),
      dataIndex: 'quantity',
      sorter: true,
      hideInForm: true,
      render: (val) => val==0?` `:`${val}`,
    },

    {
      title: formatMessage({ id: 'stock.date'}),
      dataIndex: 'createdAt',
      sorter: true,
      hideInForm: true,
      render:(_,record)=><div>{moment(record.createdAt.toDate()).format('DD-MM-YYYY')}</div>
    },
    {
      title: formatMessage({ id: 'stock.available'}),
      dataIndex: 'availablequantity',
      render:(_,record)=><div>{record.availablequantity} {record.unity} </div>
  
    },
    {
      title: formatMessage({ id: 'stock.type'}),
      dataIndex: 'stocktype',
      render:(_,record)=><div>{record.stocktype===1? <Badge  text={formatMessage({ id: 'stock.entrance'})} color="green" />:(record.stocktype===2? <Badge  text={formatMessage({ id: 'stock.exit'})} color="red" />: formatMessage({ id: 'stock.transfer'}))} </div>,
      sorter: true,

    },

    {
      title: formatMessage({ id: 'package.count'}),
      dataIndex: 'packagecount',
      render:(_,record)=><div>{record.packagecount}  </div>,
      sorter: true,

    },
    
    {
      title: formatMessage({ id: 'stock.price'}),
      dataIndex: 'sellprice',
      render:(_,record)=><div>{record.sellprice} MZN </div>,
      sorter: true,

    },


  ];

  export default stockcolumns;
