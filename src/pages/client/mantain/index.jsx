import { PrinterOutlined ,SaveOutlined } from '@ant-design/icons';
import { Button, Card,Rate,Table} from 'antd';
import React, { useState, useRef ,useEffect}   from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi';
import { connect } from 'dva';
import moment from 'moment';
import ExportXLS from '../../../components/ExportFile/exportXls';
import getXLSColumns from '../utils/clientxlscolumns';      
import getXLSData from '../utils/clientxlsdata';
const ListClient = (props) => {
  const { clients = [],currentUser={}, fetching } = props;
  const [sorter, setSorter] = useState('');
  const {dispatch} = props;
 
  const actionRef = useRef();

  const columns = [
    
    {
      title: formatMessage({ id: 'user.name'}),
      dataIndex: 'name',
      valueType: 'text',
      render:(text)=><div>{text}</div>,
    },

    {
      title: formatMessage({ id: 'client.email'}),
      dataIndex: 'email',
      valueType: 'text',
   
    },

    {
      title: formatMessage({ id: 'client.contact'}),
      dataIndex: 'phone',
      valueType: 'text',
    
    },

    {
      title: formatMessage({ id: 'client.lastpurchase'}),
      dataIndex: 'timestamp',
     
      render:(text)=><div>  {moment((new Date(parseInt(text)))).format('DD-MM-YYYY HH:mm')}</div>,
    },
  ];

  useEffect(() => {
    dispatch({
      type: 'client/fetch',
      payload: currentUser.sucursals[0].id,
    });

    },[]);
  return (
    <PageHeaderWrapper>
     
     <Card extra={<span>
      <>
      
          <Button size='middle' > <PrinterOutlined /> {formatMessage({ id: 'product.print'})}</Button>
          <ExportXLS dataset={getXLSData(clients)} sheetName={formatMessage({ id: 'menu.clients'})} collumns={getXLSColumns(columns)} />
      
        </>
     </span>} bordered={false}  >

      <Table
      size='middle'
      actionRef={actionRef}
      rowKey="id"
      loading={fetching}
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

      dataSource={clients}
      columns={columns}
      
      />


</Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ client, loading,user }) => ({
  clients: client.clients,
  currentUser:user.currentUser,
  fetching: loading.effects['client/fetch'],
}))(ListClient);

