import { formatMessage } from 'umi';

const productcollumns = [
    
    {
      title: formatMessage({ id: 'product.name'}),
      dataIndex: 'name',
      valueType: 'text',
      render:(text)=><a>{text}</a>,
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
  
  ];

  export default productcollumns;