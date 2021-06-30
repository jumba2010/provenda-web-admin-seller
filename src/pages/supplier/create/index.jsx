import React, { useState,useEffect } from 'react';
import { Form, Button,Input, Result,Select,Divider,Statistic,message,Descriptions,Card, Table,Steps } from 'antd';
const FormItem = Form.Item;
const { Step } = Steps;
const { Option } = Select;
import {findUnitiesBySucursal,findCategoriesBySucursal,findTaxesBySucursal,addTax,addProduct} from '../service';
import columns from '../components/taxcolumns';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi';
import { useHistory } from "react-router-dom";

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




const CreateForm = props => {
  const [formVals, setFormVals] = useState({
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [newTaxType, setNewTaxType] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [savingProduct, setSavingProduct] = useState(false);
  const [unities,setUnities]=useState([]);
  const [categories,setCategories]=useState([]);
  const [selectedRowKeys,setSelectedRowKeys]=useState([]);
  const [selectedTaxes,setSelectedTaxes]=useState([]);
  const history = useHistory();

  const   onSelectChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const [taxes,setTaxes]=useState([]);
  useEffect(() => {
    findUnitiesBySucursal().then(function (result){
      setUnities(result) 
     });

     findCategoriesBySucursal().then(function (result){
      setCategories(result) 
     });

     findTaxesBySucursal().then(function (result){
      setTaxes(result) 
     })
    },[]);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const forward = () => setCurrentStep(currentStep + 1);

  const backward = () => setCurrentStep(currentStep - 1);

  const addNewTaxType=()=>setNewTaxType(true);

  const saveNewType=async ()=>{
    const fieldsValue = await form2.validateFields();
    try {
      setSaving(true);
      await addTax({
        description: fieldsValue.designation,
        type:fieldsValue.type,
        value:fieldsValue.value,
        sucursalId:1,
        createdBy:1,activatedBy:1,
      });
      findTaxesBySucursal().then(function (result){
        setTaxes(result) 
        setSaving(false);
        setNewTaxType(false);
        form2.resetFields();
       })
    } catch (error) {
      message.error(formatMessage({ id: 'global.error.processing'}));
      setSaving(false);
    }

  }

  const restart=()=>{
    form.resetFields();
    setCurrentStep(currentStep - 3);
    setNewTaxType(false);
    setSuccess(false);
    setSavingProduct(false);
    setSelectedTaxes([]);
    setSelectedRowKeys([]);
  }
  
  const extra = (
    <>
      <Button type="primary" onClick={restart}>
      {formatMessage({ id: 'addnew.product'})}
       
      </Button>
      <Button onClick={()=>history.push('/product/mantain')}>
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

  const handleCreateProduct =async()=>{
     await addProduct({
        description: formVals.description,
        barcode:formVals.code,
        name:formVals.name,
        alertquantity:formVals.alertQuantity,
        unityId:formVals.unity,
        categoryId:formVals.category,
        price:formVals.price,
        taxes:selectedRowKeys,
        sucursalId:1,
        createdBy:1,activatedBy:1,
      });
      setSuccess(true);
      forward();
  }

  const renderContent = () => {
  const tailLayout={
wrapperCol:{offset:5,span:16}

    }

    const layout={
      labelCol:{span:5},
      wrapperCol:{span:16}
      
          }
          if (currentStep === 1 && newTaxType===true) {
            return (
              <>
              <Form {...layout} form={form2}> 
              
      <FormItem
                  name="designation"
                  label={formatMessage({ id: 'tax.designation'})}
                  rules={[
                    {
                      required: true,
                      message: formatMessage({ id: 'error.tax.designation.required'}),
                    },
                  ]}
                >
                  <Input
              
                    placeholder={formatMessage({ id: 'tax.designation'})}
                  />
                </FormItem>
                <FormItem name="type" label={formatMessage({ id: 'tax.type'})}>
                <Select
                    style={{
                      width: '100%',
                    }}
                  >
          <Option value="0">{formatMessage({ id: 'fixed.tax'})}</Option>
                    <Option value="1">{formatMessage({ id: 'percentage.tax'})}</Option>
                  </Select>
                </FormItem>
      
                <FormItem
                  name="value"
                  label={formatMessage({ id: 'tax.value'})}
                  rules={[
                    {
                      required: true,
                      message: formatMessage({ id: 'error.tax.value.required'}),
                    },
                  ]}
                >
                  <Input type='number' />
                </FormItem>
                <FormItem {...tailLayout} >
                <Button onClick={()=>history.goBack()} >{formatMessage({ id: 'global.cancel'})}</Button>
                <Button type='primary' loading={saving} style={{'margin-left': '5px'}}  onClick={saveNewType}>{formatMessage({ id: 'global.save'})}</Button>
                </FormItem>
                </Form>
             
              </>
            );
          }



    if (currentStep === 1 && newTaxType===false) {
      return (
        <>
    <Button type='primary' style={{'margin-left': '76%','margin-button': '50px'}} onClick={addNewTaxType} >{formatMessage({ id: 'add.tax'})}</Button>
<Table style={{'margin-top': '20px'}}
          columns={columns}
          onSelectChange={onSelectChange }
          rowSelection={rowSelection}
          rowKey='id'
          dataSource={taxes}
        />
       
        </>
      );
    }

    if (currentStep === 2) {
      return (
        <>
       <Descriptions title={formatMessage({ id: 'product.data'})} column={2} >
          <Descriptions.Item label="Nome">{formVals.name}</Descriptions.Item>
                      <Descriptions.Item label={formatMessage({ id: 'product.code'})}>{formVals.code}</Descriptions.Item>
                      <Descriptions.Item label={formatMessage({ id: 'product.unity'})}>{unities.length!=0?unities.filter((u)=>u.id===formVals.unity)[0].description:''}</Descriptions.Item>
                      <Descriptions.Item label={formatMessage({ id: 'product.alertquantity'})}>{formVals.alertQuantity} {unities.length!=0?unities.filter((u)=>u.id===formVals.unity)[0].description:''}</Descriptions.Item>
                      <Descriptions.Item label={formatMessage({ id: 'product.category'})}>{categories.length!=0?categories.filter((c)=>c.id===formVals.category)[0].description:''}</Descriptions.Item> 
                      <Descriptions.Item label={formatMessage({ id: 'product.price'})}>  <Statistic value= {formVals.price} suffix="MZN" /> </Descriptions.Item>
                    </Descriptions>  
                    <Divider ></Divider> 
                    <h3 style={{'margin-top': '15px'}}>
                    {formatMessage({ id: 'product.taxes'})}
                    </h3> 
                   
          <Table 
          columns={columns}
          dataSource={selectedTaxes}
        /> 
        </>
      );
    }

    if (currentStep === 3) {
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
          <Input placeholder={formatMessage({ id: 'product.name'})}/>
        </FormItem>

        <FormItem name="unity" label={formatMessage({ id: 'product.unity'})}  rules={[
            {
              required: true,
              message: formatMessage({ id: 'error.product.unity.required'}),
            },
          ]}
     
        >
            <Select placeholder="Ex. Kg"
              style={{
                width: '100%',
              }}
            >
             {
                unities.length!=0?unities.map((u)=>
              <Option value={u.id}>{u.description}</Option>
                ):null

              }
            </Select>
          </FormItem>

          <FormItem name="category" label={formatMessage({ id: 'product.category'})}  rules={[
            {
              required: true,
              message: formatMessage({ id: 'error.product.category.required'}),
            },
          ]}
          
        >
            <Select placeholder={formatMessage({ id: 'category.exemple'})}
              style={{
                width: '100%',
              }}
            >
             {
                categories.length!=0?categories.map((c)=>
              <Option value={c.id}>{c.description}</Option>
                ):null

              }
            </Select>
          </FormItem>

          <FormItem name="price" label={formatMessage({ id: 'product.price'})}
           rules={[
            {
              required: true,
              message: formatMessage({ id: 'error.product.price.required'}),
            },
          ]}
          >
            <Input placeholder="Ex. 59.95"
             type='number'
            />
            
          </FormItem>

          <FormItem name="alertQuantity" label={formatMessage({ id: 'product.alertquantity'})}
           rules={[
            {
              required: true,
              message: formatMessage({ id: 'error.product.alertquantity.required'}),
            },
          ]}
          >
            <Input placeholder="Ex. 50"
             type='number'
            />
            
          </FormItem>
          
          <FormItem
          name="code"
          label={formatMessage({ id: 'product.code'})}
        >
          <Input placeholder={formatMessage({ id: 'product.code'})} />
        </FormItem>
     
      </>
    );
  };

  const renderFooter = () => {
    if (currentStep === 1 && newTaxType===false && success===false) {
      return (
        <FormItem {...tailLayout}>
          <Button
          
            onClick={backward}
          >
            {formatMessage({ id: 'global.previous'})}
          </Button>
          <Button  type='danger' style={{'margin-left': '8px'}} onClick={()=>history.goBack()}>{formatMessage({ id: 'global.cancel'})}</Button>
          <Button type="primary"  style={{'margin-left': '8px'}} onClick={() => handleNext()}>
            {formatMessage({ id: 'global.next'})}
          </Button>
        </FormItem>
      );
    }

    if (currentStep === 2 && newTaxType===false && success===false) {
      return (
        <FormItem {...tailLayout}>
          <Button
          
            onClick={backward}
          >
            {formatMessage({ id: 'global.previous'})}
          </Button>
          <Button  type='danger' style={{'margin-left': '8px'}}  onClick={()=>history.goBack()}>{formatMessage({ id: 'global.cancel'})}</Button>
          <Button type="primary" style={{'margin-left': '8px'}}  loading={savingProduct} onClick={() => handleCreateProduct()}>
          {formatMessage({ id: 'global.confirm'})}
          </Button>
        </FormItem>
      );
    }


    return (
      <>
      {newTaxType===false  && success===false?
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
        <Step title={formatMessage({ id: 'product.data'})}/>
        <Step title={formatMessage({ id: 'product.taxes'})} />
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

export default CreateForm;
