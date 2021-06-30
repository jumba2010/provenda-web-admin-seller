import { Table,Avatar,Badge,Tooltip} from 'antd';
import { UserOutlined ,DollarOutlined, EditOutlined} from '@ant-design/icons';
import getBadge from '../utils/badje';
import getStatus from '../utils/status'
import moment from 'moment';
import { formatMessage } from 'umi';

const PaymentList = ({
  sorter,selectedKeys,sales,lastdata,
  setVisibleRefund,fetching,setSale,
  setVisibleConfirm,
  expandedRowRender,
    }) => {

      const columns = [
        {
          title: formatMessage({ id: 'order.id'}),
          dataIndex: 'id',
          valueType: 'text',
        },
        {
          title: formatMessage({ id: 'order.client.image'}),
          dataIndex: 'order.client.imageURL',
          valueType: 'text',
          render:(text)=><a>{text?<image src=''/>:<Avatar size={40} icon={<UserOutlined />} />}</a>,
        },
          {
            title: formatMessage({ id: 'order.client'}),
            dataIndex: 'client',
            valueType: 'text',
            render:(text)=><div>{text.name}</div>,
          },
      
          {
            title: formatMessage({ id: 'order.status'}),
            dataIndex: 'payment',
            width:40,
            valueType: 'text',
            render:(text)=> <Badge status={getBadge(text.status)} text={getStatus(text.status)} />,
          },
      
          {
            title: formatMessage({ id: 'order.items'}),
            dataIndex: 'itemsCount',
            valueType: 'text',
            render:(text)=><div>{text}</div>,
          },
      
          {
            title: formatMessage({ id: 'order.total'}),
            dataIndex: 'total',
            valueType: 'text',
            render:(text)=><div>{text} MZN</div>,
          },
      
          {
            title: formatMessage({ id: 'payment.date'}),
            dataIndex: 'paymentDate',
            valueType: 'text',
            render:(text)=><div>{text?moment((new Date(parseInt(parseInt(text))))).format('DD-MM-YYYY HH:mm'):''}</div>,
          },
      
          {
            title: formatMessage({ id: 'operations'}),
            dataIndex: 'option',
            key: 'operation',
            valueType: 'option',
            fixed: 'right',
            render: (_, record) => (
              <>

<Tooltip placement="top" title=  { record.status==='confirmed'? formatMessage({ id: 'payment.pay.out'}):formatMessage({ id: 'payment.paynow'})}>
      <a onClick={() => {
                  if(record.status==='confirmed'){
                  setVisibleRefund(true);
                  }else{
                  setVisibleConfirm(true);
                  }
                  setSale(record);
                  }}>
      {<EditOutlined  style={{ fontSize: '20px', color: '#1890ff' }}/>}

      </a>
      </Tooltip>
               
              </>
            ),
          },
        ];

return    <Table
size='middle'
  rowKey="id"
  search={false}
  onChange={(_, _filter, _sorter) => {
    const sorterResult = _sorter;
    if (sorterResult.field) {
      setSorter(`${sorterResult.field}_${sorterResult.order}`);
    }
  }}

  params={{
    sorter,
  }}
loading={fetching}
expandedRowRender={expandedRowRender}
dataSource={selectedKeys.length==0?sales:lastdata}
columns={columns}

/>

}


export default PaymentList;