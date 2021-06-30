import { formatMessage } from 'umi';
import { Divider,Badge} from 'antd';

const editProduct=(record)=>{
  localStorage.setItem('PRODUCT',JSON.stringify(record))
}
const productcolumns = [

  {
    title: formatMessage({ id: 'product.image'}),
    dataIndex: 'imageURL',
    valueType: 'text',
    render:(text)=> <img style={{width: '60px', height: '80px','vertical-align': 'middle','opacity': '0.9'}} alt="Image" src={text} />,
  },
  
    {
      title: formatMessage({ id: 'product.name'}),
      dataIndex: 'name',
      valueType: 'text',
      render:(text)=><a>{text}</a>,
    },

    {
      title: formatMessage({ id: 'product.category'}),
      dataIndex: 'categorydescription',
      valueType: 'text',
      render:(text)=><a>{text}</a>,
    },
    {
      title: formatMessage({ id: 'product.availablequantity'}),
      dataIndex: 'availablequantity',
    render:(_,record)=><div>{record.availablequantity===record.alertquantity?<Badge color='red' text= {`${record.availablequantity} ${record.unitydescription}`}  /> :<Badge color='green' text= {`${record.availablequantity} ${record.unitydescription}`}  /> }</div>
  
    },
    {
      title: formatMessage({ id: 'product.price'}),
      dataIndex: 'sellprice',
      sorter: true,
      hideInForm: true,
      render: (val) => val==null?` - `:`${val} MZN`,
    },
  
    {
      title: formatMessage({ id: 'operations'}),
      dataIndex: 'option',
      key: 'operation',
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => (
        <>
          <a href={`/product/edit/${record.id}`}
            onClick={() => {
              editProduct(record);
            }}
          >
            {formatMessage({ id: 'product.edit'})}
          </a>
          <Divider type="vertical" />
          <a href={`/product/updatestock/${record.id}`}
            onClick={() => {
              editProduct(record);
            }}
          >{formatMessage({ id: 'stock.update'})}</a>

<Divider type="vertical" />
          <a href={`/product/updatestock/${record.id}`}
            onClick={() => {
              editProduct(record);
            }}
          >{formatMessage({ id: 'product.remove'})}</a>
      
        </>
      ),
    },
  ];

  export default productcolumns;