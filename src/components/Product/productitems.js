import { Table,Descriptions} from 'antd';
import { formatMessage } from 'umi';

const Items = (
  record
    ) => {

        const columns = [
    
            {
              title: formatMessage({ id: 'product.name'}),
              dataIndex: 'product',
              valueType: 'text',
              render:(text)=><div>{text.name}</div>,
            },
        
            {
              title: formatMessage({ id: 'order.quantity'}),
              dataIndex: 'quantity',
              valueType: 'text',
              render:(text)=><div>{text}</div>,
            },
        
            {
              title: formatMessage({ id: 'order.price'}),
              dataIndex: 'price',
              valueType: 'text',
              render:(text)=><div>{text} MZN</div>,
            },
        
            {
              title: formatMessage({ id: 'order.total'}),
              dataIndex: 'total',
              valueType: 'text',
              render:(text,record)=><div>{parseInt(record.quantity)*parseInt(record.price)} MZN</div>,
            },
          
          ];

return    <div style={{ marginTop: 20,marginBottom:10 }} >  
            <Descriptions title={formatMessage({ id: 'order.client'})}  column={2}  >
            <Descriptions.Item label={formatMessage({ id: 'order.client.name'})}>{record.client.name}</Descriptions.Item>
            <Descriptions.Item label={formatMessage({ id: 'order.client.email'})}>{record.client.email}</Descriptions.Item>
            <Descriptions.Item label={formatMessage({ id: 'order.client.phone'})}>{record.client.phone}</Descriptions.Item>
            <Descriptions.Item label={formatMessage({ id: 'order.client.deliveraddress'})}>{record.client.deliveryaddress}</Descriptions.Item>
          </Descriptions>
          <Table columns={columns} dataSource={record.items} pagination={false} style={{ marginBottom: 20 ,marginTop:20}}/>  
</div>

}


export default Items;