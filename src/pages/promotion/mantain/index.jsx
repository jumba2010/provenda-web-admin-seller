import { PrinterOutlined,PlusOutlined ,SaveOutlined } from '@ant-design/icons';
import { Button, Card,Badge,Divider,Typography,Table} from 'antd';
import React, { useState, useRef ,useEffect}   from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi';
import { useHistory } from "react-router-dom";
import { connect } from 'dva';
import moment from 'moment';
import  InativatePromotion from './components/inativatepromotionmodal';
const { Text } = Typography;
const PromotionList = (props) => {
  const { promos = [],currentUser={}, fetching } = props;
  const [sorter, setSorter] = useState('');
  const history = useHistory();
  const [visible,setVisible]= useState(false);
  const [promotion, setPromotion] = useState({});
  const[deisibleDeleteProduct,setVisibleDeleteProduct]= useState([]);
  const {dispatch} = props;
  const [loadingPromotionInativatio,setLoadingPromotionInativatio]= useState(false);

  const actionRef = useRef();

  const handleCancelvisibleDeleteProduct = async () => setVisible(false);

  const addPromotion=()=>{
    history.push('/promotion/create');
  }

  const productcolumns = [
    
    {
      title: formatMessage({ id: 'product.name'}),
      dataIndex: 'name',
      valueType: 'text',
      render:(text)=><div>{text}</div>,
    },

    {
      title: formatMessage({ id: 'promotion.previous.price'}),
      dataIndex: 'sellprice',
      valueType: 'text',
      render:(text)=><div>{text} MZN</div>,
    },

    {
      title: formatMessage({ id: 'promotion.promotional.price'}),
      dataIndex: 'promotionalprice',
      valueType: 'text',
      render:(text)=><div>{text} MZN</div>,
    },

    {
      title: formatMessage({ id: 'promotion.discount'}),
      dataIndex: 'discount',
      valueType: 'text',
      render:(text)=><div>{text} MZN</div>,
    },
   
    {
      title: formatMessage({ id: 'operations'}),
      dataIndex: 'option',
      key: 'operation',
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => (
        <>
       
          <a
            onClick={() => {
              setVisible(true);
              dispatch({
                type: 'promotion/setCurrentPromotion',
                payload: record,
              });
            }}
          >{formatMessage({ id: 'product.remove'})}</a>
      
        </>
      ),
    },
  ];


  const columns = [
    
      {
        title: formatMessage({ id: 'promotion.description'}),
        dataIndex: 'description',
        valueType: 'text',
        render:(text)=><Text strong>{text}</Text>,
      },
  
      {
        title: formatMessage({ id: 'promotion.startdate'}),
        dataIndex: 'startdate',
        valueType: 'text',
        render:(text)=><div>{moment(text.toDate()).format('DD-MM-YYYY HH:mm')}</div>,
      },

      {
        title: formatMessage({ id: 'promotion.enddate'}),
        dataIndex: 'enddate',
        valueType: 'text',
        render:(text)=><div>{moment(text.toDate()).format('DD-MM-YYYY HH:mm')}</div>,
      },

      {
        title: formatMessage({ id: 'promotion.percentage'}),
        dataIndex: 'percentage',
        valueType: 'text',
        render:(text)=><div>{text} %</div>,
      },
      {
        title: formatMessage({ id: 'promotion.all.products'}),
        dataIndex: 'applytoall',
      render:(_,record)=><div>{record.applytoall?formatMessage({ id: 'global.yes'}):formatMessage({ id: 'global.no'}) }</div>
    
      },

      {
        title: formatMessage({ id: 'global.active'}),
        dataIndex: 'active',
      render:(_,record)=><div>{record.active?<Badge color='green' text= {formatMessage({ id: 'global.yes'})}  /> :<Badge color='red' text= {formatMessage({ id: 'global.no'})}  /> }</div>
    
      },
  
      {
        title: formatMessage({ id: 'operations'}),
        dataIndex: 'option',
        key: 'operation',
        valueType: 'option',
        fixed: 'right',
        render: (_, record) => (
          <>
            <a onClick={() => {
                setProduct(record);
              }}
            >
              {formatMessage({ id: 'product.edit'})}
            </a>
  <Divider type="vertical" />
            <a
              onClick={() => {
                setVisibleDeleteProduct(true);
                dispatch({
                  type: 'promotion/setCurrentPromotion',
                  payload: record,
                });
              }}
            >{formatMessage({ id: 'global.inativate'})}</a>
        
          </>
        ),
      },
    ];

    const confirmvisibleDeleteProduct=()=>{
        setLoadingPromotionInativatio(true);
        inativatePromotion(promotion);
        setVisible(false);
        setLoadingPromotionInativatio(false);
  
    }
  

  useEffect(() => {
    dispatch({
      type: 'promotion/fetch',
      payload: currentUser.sucursals[0].id,
    });

    },[]);
  return (
    <PageHeaderWrapper>
     
     <Card extra={<span>
      <>
       <Button size='middle' type='primary' onClick={addPromotion}> <PlusOutlined /> {formatMessage({ id: 'promotion.add'})}</Button>
      
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

        expandable={{
          expandedRowRender: (record) => {
            return <Table columns={productcolumns} dataSource={record.products} pagination={false} />;  
            },
          rowExpandable: record => !record.applytoall,
        }}
    
        dataSource={promos}
        columns={columns}
      
      />

      <InativatePromotion handleCancelvisibleDeleteProduct ={handleCancelvisibleDeleteProduct} 
      confirmvisibleDeleteProduct={confirmvisibleDeleteProduct} 
       loadingPromotionInativatio={loadingPromotionInativatio} 
       visible={visible} 
      />

</Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ promotion, loading,user }) => ({
  promos: promotion.promotions,
  currentUser:user.currentUser,
  fetching: loading.effects['promotion/fetch'],
}))(PromotionList);

