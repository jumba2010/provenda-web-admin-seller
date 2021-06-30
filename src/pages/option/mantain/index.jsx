import { PrinterOutlined,PlusOutlined ,EditTwoTone,DeleteTwoTone } from '@ant-design/icons';
import { Button, Card,Typography,Table,Modal,Alert,Form,Input} from 'antd';
import React, { useState, useRef ,useEffect}   from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi';
import { useHistory } from "react-router-dom";
import { connect } from 'dva';
import moment from 'moment';
const FormItem = Form.Item;
import groups from '../utils/optiongroup';
import ExportXLS from '../../../components/ExportFile/exportXls';
import getXLSColumns from '../mantain/utils/optionxlscolumns';      
import getXLSData from '../mantain/utils/optionxlsdata';

const { Text } = Typography;
const PromotionList = (props) => {
  const { options = [],currentUser={}, fetching } = props;
  const [sorter, setSorter] = useState('');
  const [option,setOption] = useState({});
  const [optionName, setOptionName]=useState(0);
  const history = useHistory();
  const [visible,setVisible]= useState(false);

  const[deisibleDeleteOption,setVisibleDeleteOption]= useState([]);
  const {dispatch} = props;
  const [loadingOptionInativation,setLoadingOptionInativation]= useState(false);

  const actionRef = useRef();

  const handleCancelvisibleDeleteOption = async () => setVisible(false);

  const addPromotion=()=>{
    history.push('/options/create');
  }

  const [form2] = Form.useForm();

  const layout={
    labelCol:{span:5},
    wrapperCol:{span:16}
    
        }


  const columns = [
    {
      title: formatMessage({ id: 'product.image'}),
      dataIndex: 'imageUrl',
      valueType: 'text',
      render:(text)=> <img style={{width: '60px', height: '60px','vertical-align': 'middle','opacity': '0.9'}} alt="Image" src={text} />,
    },
    {
      title: formatMessage({ id: 'option.name'}),
      dataIndex: 'name',
      valueType: 'text',
      render:(text)=><Text strong>{text}</Text>,
    },

    {
      title: formatMessage({ id: 'option.description'}),
      dataIndex: 'description',
      valueType: 'text',
      render:(text)=><div>{text}</div>,
    },
    
      {
        title: formatMessage({ id: 'option.group.name'}),
        dataIndex: 'group',
        valueType: 'text',
        render:(text)=><div>{groups.filter((op)=>op.code===text.code)[0].name}</div>,
      },
  
      {
        title: formatMessage({ id: 'product.name'}),
        dataIndex: 'product',
       
        render:(text)=><div>{text.name}</div>,
      },

      {
        title: formatMessage({ id: 'product.price'}),
        dataIndex: 'price',
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

<a onClick={() => {
          
                setOption(record);
              }}>
            {<EditTwoTone  style={{ fontSize: '20px', color: '#1890ff' }}/>}

            </a>

            <a style={{'margin-left':'20px'}} onClick={() => {
                setVisibleDeleteOption(true);
                setOption(record);
              }}>
            {<DeleteTwoTone  twoToneColor="#FC550B"  style={{ fontSize: '20px' }}/>}

            </a>
          </>
        ),
      },
    ];

    const confirmvisibleDeleteOption=()=>{
        setLoadingOptionInativation(true);
        dispatch({
          type: 'option/delete',
          payload: {
            option
          },
        });
        set
        setVisible(false);
        setLoadingOptionInativation(false);
  
    }
  

  useEffect(() => {
    dispatch({
      type: 'option/fetch',
      payload: currentUser.sucursals[0].id,
    });

    },[]);
  return (
    <PageHeaderWrapper>
     
     <Card extra={<span>
      <>
       <Button size='middle' type='primary' onClick={addPromotion}> <PlusOutlined /> {formatMessage({ id: 'option.create'})}</Button>
          <Button size='middle' style={{'margin-left':'10px'}}> <PrinterOutlined /> {formatMessage({ id: 'product.print'})}</Button>
          <ExportXLS dataset={getXLSData(options)} sheetName={formatMessage({ id: 'option.list'})} collumns={getXLSColumns(columns)} />
      
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

        dataSource={options}
        columns={columns}
      
      />

<Modal
visible={visible}
title={  <Alert message={formatMessage({ id: 'delete.option.question'})} description={formatMessage({ id: 'delete.option.warning'})} type="error" showIcon />}
        footer={[
            <Button key="back" onClick={handleCancelvisibleDeleteOption}>
              {formatMessage({ id: 'global.cancel'})}
            </Button>,
            <Button key="submit" type="danger" disabled={!option.name || optionName.toLowerCase()!=option.name.toLowerCase()} loading={loadingOptionInativation} onClick={confirmvisibleDeleteOption}>
              {formatMessage({ id: 'product.remove'})}
            </Button>,
          ]}
          closable={false}
          onCancel={handleCancelvisibleDeleteOption}
        >
       <Form {...layout} form={form2}> 
       <Text type="secondary" > {formatMessage({ id: 'confirm.option.delection'})}</Text>
        <FormItem
                 
                 label={formatMessage({ id: 'option.name'})}
                 rules={[
                   {
                     required: true,
                     message: formatMessage({ id: 'error.option.name.required'}),
                   },
                  
                 ]}
                >
                  <Input
              name="name"
              autoComplete='off'
              onChange={(ev)=>{

                setOptionName(ev.target.value);
              }}
                    placeholder={option.name}
                  />
                </FormItem></Form>
        </Modal>
</Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ option, loading,user }) => ({
  options: option.options,
  currentUser:user.currentUser,
  fetching: loading.effects['option/fetch'],
}))(PromotionList);

