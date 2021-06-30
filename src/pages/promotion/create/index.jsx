import React, { useState,useEffect } from 'react';
import { Form, Button,Input,InputNumber, DatePicker,
        Result,Checkbox,Select,Divider,Descriptions,Card,
        Table,Steps } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi';
import { useHistory } from "react-router-dom";
import { connect } from 'dva';
import productcollumns from './utils/productcolumns';
const FormItem = Form.Item;
const { Step } = Steps;
const { Option } = Select;
const { RangePicker } = DatePicker;
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

const CreatePromotion = props => {
  const { products = [] ,currentUser={}} = props;
  const [formVals, setFormVals] = useState({
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [applytoall, setApplytoAll] = useState(true);
  const dispatch = props;
  const [success, setSuccess] = useState(false);
  const [savingPromotion, setSavingPromotion] = useState(false);
  const [selectedRowKeys,setSelectedRowKeys]=useState([]);
  const [percentage, setPercentage]=useState(5);
  const [selectedProducts,setSelectedProducts]=useState([]);
  const history = useHistory();
  const [form] = Form.useForm();

  const forward = () => setCurrentStep(currentStep + 1);

  const onChangePercentage=(value) =>{
    setPercentage(value);
  }

  const applyPromotion=(selectedKeys,products)=>{

    if(applytoall){
      let selectedProducts=products.map((p)=>{
        let newProduct={... p};
        newProduct["discount"]=parseFloat(p.sellprice*percentage)/100;
        newProduct["promotionalprice"]=parseFloat(p.sellprice) - parseFloat(p.sellprice*percentage)/100;
        return newProduct;
        });
        setSelectedProducts(selectedProducts);
    }
    
    else{

let selectedProducts=selectedKeys.map((id)=>{

let product=products.find((p)=>p.id===id);
let newProduct={... product};

newProduct["discount"]=parseFloat(product.sellprice*percentage)/100;
newProduct["promotionalprice"]=parseFloat(product.sellprice) - parseFloat(product.sellprice*percentage)/100;
return newProduct;
});

setSelectedProducts(selectedProducts);
}
}

  const extra = (
    <>
      <Button onClick={()=>history.push('/promotion')}>
      {formatMessage({ id: 'list.promotions'})}
      </Button>
    </>
  );
  
  const handleNext = async () => {
  const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });
    applyPromotion(selectedRowKeys,products);
    forward();

  };

  const changeSelectproduct=(value)=>{
    setSelectedRowKeys(value);
  }

  const toggleChecked = (e) => {
    setApplytoAll(e.target.checked);
  };

  const handleCreateProduct =async()=>{
      setSavingPromotion(true);

      dispatch({
        type: 'promotion/create',
        payload: {
          description: formVals.description,
          startdate:formVals.period[0].toDate(),
          enddate:formVals.period[1].toDate(),
          percentage,
          applytoall,
          products:selectedProducts,
          sucursalId:currentUser.id,
          createdBy:currentUser.id,activatedBy:currentUser.id,
        },
      });
  
      setSuccess(true);
      setSavingPromotion(false);
      forward();
  }

  const renderContent = () => {

    const layout={
      wrapperCol: { offset: 7, span: 16 },
      
          }


    if (currentStep === 1) {
      return (
        <>
       <Descriptions title={formatMessage({ id: 'product.data'})} column={2} >
         
                      <Descriptions.Item label={formatMessage({ id: 'promotion.description'})}>{formVals.description}</Descriptions.Item>
      <Descriptions.Item label={formatMessage({ id: 'promotion.period'})}>{formVals.period[0].format('DD-MM-YYYY HH:mm')} {formatMessage({ id: 'promotion.to'})} {formVals.period[1].format('DD-MM-YYYY HH:mm')} </Descriptions.Item>
                      <Descriptions.Item label={formatMessage({ id: 'promotion.percentage'})}>  {percentage} % </Descriptions.Item>
                      <Descriptions.Item label={formatMessage({ id: 'promotion.apply.toall.products'})}> {applytoall?formatMessage({ id: 'global.yes'}):formatMessage({ id: 'global.no'})}</Descriptions.Item>
                     
                    </Descriptions>  
                    <Divider ></Divider> 
                    {applytoall?null:  
                    <h3 style={{'margin-top': '15px'}}>
                    {formatMessage({ id: 'product.list'})}
    </h3> }
           {applytoall?null:        
          <Table 
          columns={productcollumns}
          dataSource={selectedProducts}
           /> }
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
          name="description"
          label={formatMessage({ id: 'promotion.description'})}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'promotion.description.required'}),
            },
          ]}
        >
          <Input.TextArea rows={4} placeholder={formatMessage({ id: 'promotion.description'})}/>
        </FormItem>

        <FormItem name="period" label={formatMessage({ id: 'promotion.period'})}  rules={[
            {
              required: true,
              message: formatMessage({ id: 'promotion.period.required'}),
            },
          ]}
     
        >


<RangePicker style={{'width':'100%'}}
      showTime={{ format: 'HH:mm' }}
      format="YYYY-MM-DD HH:mm"
  
    />   
          </FormItem>

          <FormItem label={formatMessage({ id: 'promotion.percentage'})}  rules={[
            {
             
              message: formatMessage({ id: 'promotion.percentage.required'}),
            },
          ]}>

  <InputNumber
      defaultValue={5}
      onChange={onChangePercentage}
      min={1}
      step={5}
      max={99}
      formatter={value => `${value}%`}
      parser={value => value.replace('%', '')}
    />
          </FormItem>

          <Form.Item {...layout} name="applytoall" valuePropName="applytoall">
        <Checkbox checked={applytoall}  onChange={toggleChecked}>{formatMessage({ id: 'promotion.apply.toall.products'})}</Checkbox>
      </Form.Item>
      <FormItem name="productlist" label={formatMessage({ id: 'product.list'})} 
          
        >

<Select disabled={applytoall?true:false}
    mode="multiple"
    onChange={changeSelectproduct}
    style={{ width: '100%' }}
    placeholder={formatMessage({ id: 'select.products'})}
    optionLabelProp="label"
  >
    {
      products.map((p)=> <Option value={p.id} label={p.name}>
      <div className="demo-option-label-item">
        <span role="img" aria-label={p.name}>
       <img style={{width: '50px', height: '50px','vertical-align': 'middle','opacity': '0.80'}} alt="example" src={p.filenames[0]} />
        </span>
        {p.name}
      </div>
    </Option>)
    }
   </Select> 
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
 
    return (
      <>
      
      <FormItem {...tailLayout}>

        {currentStep===1?<Button  type='danger' onClick={()=>setCurrentStep(0)}>{formatMessage({ id: 'global.previous'})}</Button>:null}
        
        {currentStep==0? <Button type="primary"  style={{'margin-left': '0px'}}  onClick={() => handleNext()}>
          {formatMessage({ id: 'global.next'})}
        </Button>: null}
        {currentStep==1?<Button type="primary"  style={{'margin-left': '8px'}}  onClick={handleCreateProduct}>
          {formatMessage({ id: 'global.confirm'})}
        </Button>:null}
      </FormItem>

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
        <Step title={formatMessage({ id: 'promotion.data'})}/>
        <Step title={formatMessage({ id: 'global.confirmation.step'})} />
        <Step title={formatMessage({ id: 'global.success.step'})} />
      </Steps>
      <Form
        {...formLayout}
        form={form}
     
      >
        {renderContent()}
        {renderFooter()}
      </Form>
      </Card>
   </PageHeaderWrapper>
  );
};

export default  connect(({ product,user, loading }) => ({
  products: product.products,
  fetching: loading.models.product,
  currentUser:user.currentUser,
}))(CreatePromotion);