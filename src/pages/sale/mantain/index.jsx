import { PrinterOutlined ,SaveOutlined } from '@ant-design/icons';
import { Button,message,Form,Select,Card,Tabs} from 'antd';
import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi';
import dates from '../../../utils/dates';
import paymentstatus from '../../../utils/paymentstatus';
import { connect } from 'dva';
import ConfirmPaymentModal from './component/confirmpayment';
import RefundPaymentModal from './component/refundpayment';
import RefundList from './component/refundlist';
import PaymentList from './component/paymentlist';
import ExportXLS from '../../../components/ExportFile/exportXls';
import getXLSColumns from './utils/paymentxlscolumns';      
import getXLSData from './utils/paymentxlsdata';
import expandedRowRender from '@/components/Product/productitems';
const { TabPane } = Tabs;

const ListSales = (props) => {
  const {refundedlist = [], sales = [],fetching } = props;
  const [sorter, setSorter] = useState('');
  const [visibleConfirm,setVisibleConfirm]= useState(false);
  const [visibleRefund,setVisibleRefund]= useState(false);
  const [sale, setSale] = useState({});
  const [paymentType,setPaymentType]=useState('');
  const [selectedKeys, setSelectedKeys] = useState([]);
  const {dispatch} = props;
  const [lastdata, setLastdata] = useState([]);

  const [form2] = Form.useForm();
  const [form] = Form.useForm();


  const columns = [
    {
      title: formatMessage({ id: 'order.id'}),
      dataIndex: 'id',
      valueType: 'text',
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
  
    ];

    const handleSearchByDates=()=>{
      const hide = message.loading('Processing...', 0);
      // Dismiss manually and asynchronously
      setTimeout(hide, 2500);
    }

    const confirmPayment=async ()=>{
      const fieldsValue = await form.validateFields();
      sale.paymentremarks=fieldsValue.remarks;
      dispatch({
        type: 'sale/confirm',
        payload: sale,
      });
      setVisibleConfirm(false);
    }

    const refundPayment=async ()=>{
      const fieldsValue = await form2.validateFields();
      sale.paymentremarks=fieldsValue.remarks;
      dispatch({
        type: 'sale/refund',
        payload: sale,
      });
      setVisibleRefund(false);
    }

    const handleSelectPaymentType=(value)=>{
      setPaymentType(value)
    }
  
  return (
    <PageHeaderWrapper>
     <Card 
     title={<span>
      <div style={{'margin-left':'0px'}}>
    <Select
    labelInValue
    defaultValue={{ key: '1' ,value:formatMessage({ id: 'dates.today'})}}
    style={{ 'margin-left': '0px','width':'35%'}}
    onChange={handleSearchByDates}
  >
{dates.map((d)=> <Option value={d.key}>{d.des}</Option>)}

  </Select>
    <Select  placeholder={formatMessage({ id: 'search.by.status'})} 
   mode="multiple"
      onChange={(statuscodes) =>{
        setSelectedKeys(statuscodes);
        if(statuscodes.length===0){
          setLastdata([]);
        }
        else{
          let s=sales.filter(d=>statuscodes.includes(d.status));
          setLastdata(s);
        }
      }}

    style={{ 'margin-left': '10px','width':'45%' }}>       
    {
                paymentstatus.length!=0?paymentstatus.map((u)=>
              <Option value={u.code}>{u.des}</Option>
                ):null

              }

</Select>

</div>
     </span>} 
     
     extra={<span>
      <>
  <Button size='middle' style={{'margin-left':'10px'}}> <PrinterOutlined /> {formatMessage({ id: 'product.print'})}</Button>
  <ExportXLS dataset={getXLSData(sales)} sheetName={formatMessage({ id: 'sale.list'})} collumns={getXLSColumns(columns)} />
      
        </>
     </span>} bordered={false}  >
     <Tabs defaultActiveKey="1" type="card">
    <TabPane tab={formatMessage({ id: 'sale.list'})} key="1" style={{ marginButton: 20 }} >

   <PaymentList sorter={sorter} setVisibleRefund={setVisibleRefund} selectedKeys={selectedKeys} fetching={selectedKeys} 
   setVisibleConfirm={setVisibleConfirm} 
   sales={sales} lastdata={lastdata} setSale={setSale}
   expandedRowRender={expandedRowRender}/>
</TabPane>

<TabPane tab={formatMessage({ id: 'sale.payout.list'})} key="2" style={{ marginButton: 20 }} >
<RefundList sorter={sorter} refundedlist={refundedlist} expandedRowRender={expandedRowRender}/>
</TabPane>

</Tabs>

<ConfirmPaymentModal form={form} visible={visibleConfirm} onClickBack={()=>setVisibleConfirm(false)} 
confirmPayment={confirmPayment} handleSelectPaymentType={handleSelectPaymentType} />

<RefundPaymentModal form={form2} visible={visibleRefund} onClickBack={()=>setVisibleRefund(false)} 
refundPayment={refundPayment} />
</Card>
    </PageHeaderWrapper>
  );
};

export default  connect(({ sale, loading }) => ({
  sales: sale.sales,
  refundedlist: sale.refundedlist,
  fetching: loading.models.sale,
}))(ListSales);
