import { PrinterOutlined ,SaveOutlined } from '@ant-design/icons';
import { Button, Card,Rate,Table} from 'antd';
import React, { useState, useRef ,useEffect}   from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi';
import { connect } from 'dva';
import moment from 'moment';
import ExportXLS from '../../../components/ExportFile/exportXls';
import getXLSColumns from '../utils/reviewxlscolumns';      
import getXLSData from '../utils/reviewxlsdata';
const MarketReview = (props) => {
  const { reviews = [],currentUser={}, fetching } = props;
  const [sorter, setSorter] = useState('');
  const {dispatch} =props;
 
  const actionRef = useRef();

  const columns = [
    
    {
      title: formatMessage({ id: 'review'}),
      dataIndex: 'review',
      valueType: 'text',
      render:(text)=><div>{text}</div>,
    },

    {
      title: formatMessage({ id: 'review.rate'}),
      dataIndex: 'rate',
      valueType: 'text',
      render:(text)=><Rate disabled value={parseFloat(text)} allowHalf={true}/>,
    },

    {
      title: formatMessage({ id: 'product.name'}),
      dataIndex: 'product',
      render:(text)=><div>{text.name}</div>,
    },

    {
      title: formatMessage({ id: 'review.user'}),
      dataIndex: 'user',
      render:(text)=><div>{text.name}</div>,
    },

    {
      title: formatMessage({ id: 'review.updatedAt'}),
      dataIndex: 'id',
     
      render:(text)=><div>{moment((new Date(parseInt(text)))).format('DD-MM-YYYY HH:mm')}</div>,
    },
  ];

  useEffect(() => {
    dispatch({
      type: 'review/fetchProductReviews',
      payload: currentUser.sucursals[0].id,
    });

    },[]);
  return (
    <PageHeaderWrapper>
     
     <Card extra={<span>
      <>
      
          <Button size='middle' > <PrinterOutlined /> {formatMessage({ id: 'product.print'})}</Button>
          <ExportXLS dataset={getXLSData(reviews)} sheetName={formatMessage({ id: 'menu.market.reviews'})} collumns={getXLSColumns(columns,false)} />
      
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

        dataSource={reviews}
        columns={columns}
      
      />


</Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ review, loading,user }) => ({
  reviews: review.productReviews,
  currentUser:user.currentUser,
  fetching: loading.effects['reviews/fetchProductReviews'],
}))(MarketReview);

