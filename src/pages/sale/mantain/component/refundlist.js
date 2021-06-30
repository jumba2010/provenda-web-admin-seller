import { Table,Avatar} from 'antd';
import moment from 'moment';
import { formatMessage } from 'umi';
import { UserOutlined } from '@ant-design/icons';

const columns = [
    
  {
    title: formatMessage({ id: 'order.id'}),
    dataIndex: 'orderid',
    valueType: 'text',
  },
  {
    title: formatMessage({ id: 'order.client.image'}),
    dataIndex: 'imageURL',
    valueType: 'text',
    render:(text)=><a>{text?<image src=''/>:<Avatar size={40} icon={<UserOutlined />} />}</a>,
  },
    {
      title: formatMessage({ id: 'order.client'}),
      dataIndex: 'client',
      valueType: 'text',
      render:(text)=><a>{text.name}</a>,
    },

    {
      title: formatMessage({ id: 'order.items'}),
      dataIndex: 'quantity',
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
      title: formatMessage({ id: 'order.updatedat'}),
      dataIndex: 'updatedAt',
      valueType: 'text',
      render:(text)=><div>{moment(text.toDate()).format('DD-MM-YYYY HH:mm')}</div>,
    },
    {
      title: formatMessage({ id: 'sale.remarks'}),
      dataIndex: 'remarks',
      valueType: 'text'
    },
  ];

const RefundList = ({
  sorter,refundedlist,
  expandedRowRender,
    }) => {

return <Table
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
  expandedRowRender={expandedRowRender}
  dataSource={refundedlist}
  columns={columns}

/>

}


export default RefundList;