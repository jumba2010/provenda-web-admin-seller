import React, { useState,useEffect } from 'react';
import { connect } from 'dva';
import { Form, Button,Input,Badge, Result,Select,Statistic,Descriptions,Card,Steps } from 'antd';
const FormItem = Form.Item;
const { Step } = Steps;
const { Option } = Select;
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi';
import { useHistory,useParams } from "react-router-dom";


const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const tailLayout = {
  wrapperCol: { offset: 7, span: 16 },
};

const UpdateStock = props => {
  const { currentProduct={},loading } = props;
  const [formVals, setFormVals] = useState({
    name: currentProduct.name,
    barcode: currentProduct.barcode,
    price: currentProduct.price,
    alertquantity: currentProduct.alertquantity,
    unityId: currentProduct.unity.id,
    unity:currentProduct.unity.name,
    id: currentProduct.id,
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [savingProduct, setSavingProduct] = useState(false);
  const [suppliers,setSuppliers]=useState([]);
  const [selectedRowKeys,setSelectedRowKeys]=useState([]);
  const { dispatch } = props;
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {

    },[]);


  const [form] = Form.useForm();

  const forward = () => setCurrentStep(currentStep + 1);

  const backward = () => setCurrentStep(currentStep - 1);

  const restart=()=>{
    form.resetFields();
    setCurrentStep(currentStep - 3);
    setSuccess(false);
    setSavingProduct(false);
    setSelectedTaxes([]);
    setSelectedRowKeys([]);
  }
  
  const extra = (
    <>
      <Button type="primary" onClick={restart}>
      {formatMessage({ id: 'global.print'})}
       
      </Button>
      <Button onClick={()=>history.push('/product')}>
      {formatMessage({ id: 'list.products'})}
      </Button>
    </>
  );

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });
let selectedTaxes=[];
    if(currentStep===1){
      for (let index = 0; index < selectedRowKeys.length; index++) {
        selectedTaxes=selectedTaxes.concat(taxes.filter((t)=>t.id===selectedRowKeys[index]))

        
      }
setSelectedTaxes(selectedTaxes);

    }
    forward();

  };

  const handleUpdateStock =()=>{

    dispatch({
      type: 'product/updateStock',
      payload: {
        productname:formVals.name,
        stocktype:formVals.stocktype,
        quantity:formVals.quantity,
        sellprice:formVals.sellprice,
        packagecount:formVals.packagecount?formVals.packagecount:0,
        providerid:formVals.provider, 
        productid:id,
        sucursalId:1,
        createdBy:1,
        activatedBy:1,
        },
    });
 
      forward();
  }

  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>
       <Descriptions title={formatMessage({ id: 'product.data'})} column={2} >
          <Descriptions.Item label="Nome">{formVals.name}</Descriptions.Item>
                      <Descriptions.Item label={formatMessage({ id: 'product.code'})}>{formVals.code}</Descriptions.Item>
       
                      <Descriptions.Item label={formatMessage({ id: 'stock.type'})}>{formVals.stocktype==1?<Badge  style={{ backgroundColor: '#52c41a' }} count= {formatMessage({ id: 'stock.entrance'})}  />:(formVals.stocktype==2?<Badge count= {formatMessage({ id: 'stock.exit'})}  />:formatMessage({ id: 'stock.transfer'}))}</Descriptions.Item>
                      <Descriptions.Item label={formatMessage({ id: 'stock.quantity'})}>{formVals.quantity} {formVals.unity}</Descriptions.Item>
                      <Descriptions.Item label={formatMessage({ id: 'package.count'})}><Statistic value= {formVals.packagecount} suffix="MZN" /></Descriptions.Item>
                      <Descriptions.Item label={formatMessage({ id: 'product.price'})}>  <Statistic value= {formVals.sellprice} suffix="MZN" /> </Descriptions.Item>
                      <Descriptions.Item label={formatMessage({ id: 'supplier.name'})}>{formVals.provider && suppliers.length!=0?suppliers.filter((s)=>s.id===formVals.provider)[0].name:''}</Descriptions.Item>
                      <Descriptions.Item label={formatMessage({ id: 'stock.income.percent'})}><Statistic value= {formVals.sellprice?((formVals.sellprice)-(formVals.packagecount)):0} suffix="MZN" /></Descriptions.Item>
                    </Descriptions>
        </>
      );
    }

    if (currentStep === 2) {
      return (
        <>
       <Form {...formItemLayout} style={{ padding: '50px 0' }}>
<Result
    status="success"
    title= {formatMessage({ id: 'global.success'})}
    subTitle= {formatMessage({ id: 'product.registered.successfuly'})}
    extra={extra}
    />
<Form.Item >

        
        </Form.Item>
      </Form>
        </>
      );
    }

    return (
      <>
        <FormItem
          name="name"
          label={formatMessage({ id: 'product.name'})}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'error.product.name.required'}),
            },
          ]}
        >
          <Input placeholder={formatMessage({ id: 'product.name'})} disabled />
        </FormItem>

        <FormItem name="stocktype" label={formatMessage({ id: 'stock.type'})}  
           rules={[
            {
              required: true,
            },
          ]}
          >
              <Select placeholder={formatMessage({ id: 'stock.type'})}
                style={{
                  width: '100%',
                }}
              >
              <Option value='1'>{formatMessage({ id: 'stock.entrance'})}</Option>
              <Option value='2'>{formatMessage({ id: 'stock.exit'})}</Option>
              <Option value='3'>{formatMessage({ id: 'stock.transfer'})}</Option>
              </Select>
            </FormItem>
          <FormItem name="quantity" label={formatMessage({ id: 'stock.quantity'})}
           rules={[
            {
              required: true,
              message: formatMessage({ id: 'error.stock.quantity.required'}),
            },
          ]}
          >
            <Input  suffix={formVals.unity}
             type='number' 
            />
            
          </FormItem>
        
        <FormItem name="packagecount" label={formatMessage({ id: 'package.count'})} 
           rules={[
            {
              required: false,
              message: formatMessage({ id: 'error.product.price.required'}),
            },
          ]}
          >
            <Input suffix="MZN" 
             type='number'
            />
            
          </FormItem>

          <FormItem name="sellprice" label={formatMessage({ id: 'product.price'})}
           rules={[
            {
              required: true,
              message: formatMessage({ id: 'error.product.price.required'}),
            },
          ]}
          >
            <Input suffix="MZN" 
             type='number'
            />
            
          </FormItem>
          <FormItem name="provider" label={formatMessage({ id: 'supplier'})}  
          
        >
            <Select placeholder={formatMessage({ id: 'supplier.name'})}
              style={{
                width: '100%',
              }}
            >
             {
                suppliers.length!=0?suppliers.map((s)=>
              <Option value={s.id}>{s.name}</Option>
                ):null

              }
            </Select>
          </FormItem>
     
      </>
    );
  };

  const renderFooter = () => {

    if (currentStep === 1 && success===false) {
      return (
        <FormItem {...tailLayout}>
          <Button
          
            onClick={backward}
          >
            {formatMessage({ id: 'global.previous'})}
          </Button>
          <Button  type='danger' style={{'margin-left': '8px'}}  onClick={()=>history.goBack()}>{formatMessage({ id: 'global.cancel'})}</Button>
          <Button type="primary" style={{'margin-left': '8px'}}  loading={savingProduct} onClick={() => handleUpdateStock()}>
          {formatMessage({ id: 'global.confirm'})}
          </Button>
        </FormItem>
      );
    }

    return (
      <>
      {success===false?
      <FormItem {...tailLayout}>
        <Button  type='danger' onClick={()=>history.goBack()}>{formatMessage({ id: 'global.cancel'})}</Button>
        <Button type="primary"  style={{'margin-left': '8px'}}  onClick={() => handleNext()}>
          {formatMessage({ id: 'global.next'})}
        </Button>
      </FormItem>:null}

      </>
    );
  };

  return (
    <PageHeaderWrapper>
      <Card  >
      <Steps
        style={{
          marginBottom: 28
        }}
        size="small"
        current={currentStep}
      >
        <Step title={formatMessage({ id: 'stock'})}/>
        <Step title={formatMessage({ id: 'global.confirmation.step'})} />
        <Step title={formatMessage({ id: 'global.success.step'})} />
      </Steps>
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          name: formVals.name,
          barcode: formVals.barcode,
          unity: formVals.unity,
          stocktype:'1',
          description: formVals.description,
          price: formVals.price,
          alertquantity: formVals.alertquantity,
        }}
      >
        {renderContent()}
        {renderFooter()}
      </Form>
      </Card>
   </PageHeaderWrapper>
  );
};

export default  connect(({ product, loading }) => ({
  currentProduct: product.currentProduct,
  loading: loading.effects['product/updatestock'],
}))(UpdateStock);
