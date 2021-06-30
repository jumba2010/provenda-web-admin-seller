import React, { useState,useEffect } from 'react';
import { Form, Button,Input,Result,Upload,Select,Divider,Statistic,Modal,Descriptions,Card, Table,Steps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const FormItem = Form.Item;
const { Step } = Steps;
const { Option } = Select;
const { Dragger } = Upload;
import columns from '../components/taxcolumns';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi';
import { useHistory } from "react-router-dom";
import { connect } from 'dva';
import {uploadFile,deleteFile} from '../../../utils/fileutils';
import categories from '../utils/categories';

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

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const EditProduct = props => {
  const {unities=[],taxes=[],currentUser={},currentProduct={} } = props;
  const [currentStep, setCurrentStep] = useState(0);
  const [newTaxType, setNewTaxType] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [savingProduct, setSavingProduct] = useState(false);
  const [selectedRowKeys,setSelectedRowKeys]=useState([]);
  const [selectedTaxes,setSelectedTaxes]=useState([]);
  const [previewVisible,setPreviewVisible]= useState(false);
  const [previewImage,setPreviewImage]= useState('');
  const [previewTitle,setPreviewTitle]= useState('');
  const [fileList, setFileList]=useState([]);
  const dispatch = props;
  const [fileNameHistories, setFileNameHistories]=useState([]);
  const history = useHistory();
  const [formVals, setFormVals] = useState({
    description:currentProduct.description,
    name:currentProduct.name,
    sellprice:currentProduct.sellprice,
    packagecount:currentProduct.packagecount,
    availablequantity:currentProduct.availablequantity,
    unity:currentProduct.unity?currentProduct.unity.id:'',
    category:currentProduct.category?currentProduct.category.id:''
  });


  const  onSelectChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys);
  };

  useEffect(() => {
    setSelectedRowKeys(currentProduct.taxes?currentProduct.taxes.map(t=>t.id):[]);
    fileList.push({url:currentProduct.filenames?currentProduct.filenames[0]:''});

   },{});

  const handleCancel = async () => setPreviewVisible(false);

  const handleChange = async (info) => {
    setFileList(info.fileList);
    if (info.file.status === 'done') {
      setFileList(fileList);
      let filename=await uploadFile(info.file.originFileObj);
      let fileNamehistory={originalName:info.file.originFileObj.name,newName:filename};
      fileNameHistories.push(fileNamehistory);
      setFileNameHistories(fileNameHistories);
    }
  }

 const  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
setPreviewImage(file.url || file.preview);
setPreviewVisible(true);
setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));

  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const forward = () => setCurrentStep(currentStep + 1);

  const backward = () => setCurrentStep(currentStep - 1);

  const addNewTaxType=()=>setNewTaxType(true);

  const saveNewType=async ()=>{
    const fieldsValue = await form2.validateFields();
  setSaving(true);

  dispatch({
        type: 'product/addTax',
        payload: {
          description: fieldsValue.designation,
          type:fieldsValue.type,
          value:fieldsValue.value,
          sucursalId:currentUser.id,
          createdBy:currentUser.id,activatedBy:currentUser.id,
        },
      });

      setSaving(false);
      setNewTaxType(false);
      form2.resetFields();
   
  }

  const onRemove=(file)=>{
   let newName=fileNameHistories.filter((fh)=>fh.originalName===file.originFileObj.name)[0].newName;
    deleteFile(newName);
  }

  const restart=()=>{
    form.resetFields();
    setCurrentStep(currentStep - 4);
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
      <Button onClick={()=>history.push('/product')}>
      {formatMessage({ id: 'list.products'})}
      </Button>
    </>
  );

  const normFile = e => {
    setFileList(e.fileList);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  
  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });
let selectedTaxes=[];
    if(currentStep===2){
      for (let index = 0; index < selectedRowKeys.length; index++) {
        selectedTaxes=selectedTaxes.concat(taxes.filter((t)=>t.id===selectedRowKeys[index]))

        
      }
setSelectedTaxes(selectedTaxes);

    }
    forward();

  };

  const handleUpdateProduct =async()=>{
setSavingProduct(true);
    let category=categories.filter((c)=>c.id===formVals.category)[0];
    let unity=unities.filter((u)=>u.id===formVals.unity)[0];
    let filenames= fileNameHistories.map(a => a.newName);
let product={
  description: formVals.description,
  name:formVals.name,
  unity:unity,
  productid:currentProduct.id,
  category,
  filenames,
  sellprice:formVals.sellprice,
  packagecount:formVals.packagecount,
  availablequantity:formVals.availablequantity,
  taxes:selectedTaxes,
}
    console.log('A mandar:',product);
      dispatch({
        type: 'product/update',
        payload: {
          product
        },
      });

      setSuccess(true);
      setSavingProduct(false);
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

          if (currentStep === 1) {
            return (
              <>
<FormItem name="availablequantity" label={formatMessage({ id: 'product.availablequantity'})}
           rules={[
            {
              required: false,
              message: formatMessage({ id: 'error.product.price.required'}),
            },
          ]}
          >
            <Input placeholder=""
             type='number' suffix={unities.filter((u)=>u.id===formVals.unity)[0].name}
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
            <Input 
            placeholder={formatMessage({ id: 'package.count.description'})}
             type='number'
            />
            
          </FormItem>

          <FormItem name="sellprice" label={formatMessage({ id: 'product.price'})}
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
        
              </>
            );
          }

          if (currentStep === 2 && newTaxType===true) {
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
                <FormItem name="type" label={formatMessage({ id: 'tax.type'})}
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'error.tax.type.required'}),
                  },
                ]}
                >
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
                <Button onClick={()=>setNewTaxType(false)} >{formatMessage({ id: 'global.cancel'})}</Button>
                <Button type='primary' loading={saving} style={{'margin-left': '5px'}}  onClick={saveNewType}>{formatMessage({ id: 'global.save'})}</Button>
                </FormItem>
                </Form>
             
              </>
            );
          }


    if (currentStep === 2 && newTaxType===false) {
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

    if (currentStep === 3) {
      return (
        <>
       <Descriptions title={formatMessage({ id: 'product.data'})} column={2} >
          <Descriptions.Item label="Nome">{formVals.name}</Descriptions.Item>
          
                      <Descriptions.Item label={formatMessage({ id: 'product.unity'})}>{unities.length!=0?unities.filter((u)=>u.id===formVals.unity)[0].name:''}</Descriptions.Item>
                       <Descriptions.Item label={formatMessage({ id: 'product.availablequantity'})}>{formVals.availablequantity} {unities.filter((u)=>u.id===formVals.unity)[0].name}</Descriptions.Item>
                      <Descriptions.Item label={formatMessage({ id: 'product.category'})}>{formVals.category && categories.length!=0?categories.filter((c)=>c.id===formVals.category)[0].name:''}</Descriptions.Item> 
                      <Descriptions.Item label={formatMessage({ id: 'product.price'})}>  <Statistic value= {formVals.sellprice} suffix="MZN" /> </Descriptions.Item>
                      <Descriptions.Item label={formatMessage({ id: 'package.count'})}>{formVals.packagecount}</Descriptions.Item>
                     
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

    if (currentStep === 4) {
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

        <FormItem
          name="description"
          label={formatMessage({ id: 'product.description'})}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'product.desrcription.required'}),
            },
          ]}
        >
          <Input.TextArea rows={4} placeholder={formatMessage({ id: 'product.description'})}/>
        </FormItem>

        <Form.Item label={formatMessage({ id: 'product.images'})}>
        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
         
        <Dragger {...props}
         fileList={fileList}
         onPreview={handlePreview}
         onChange={handleChange}
         onRemove={onRemove}
        >
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">{formatMessage({ id: 'click.to.upload'})}</p>
    <p className="ant-upload-hint">
    {formatMessage({ id: 'warning.upload'})}
    </p>
  </Dragger>
         
        </Form.Item>
      </Form.Item>

        <FormItem name="unity" label={formatMessage({ id: 'product.unity'})}  rules={[
            {
              required: true,
              message: formatMessage({ id: 'error.product.unity.required'}),
            },
          ]}
     
        >
            <Select placeholder="Ex. Kg,g,l, ml, m,Un"
              style={{
                width: '100%',
              }}
            >
             {
                unities.length!=0?unities.map((u)=>
              <Option value={u.id}>{u.name}</Option>
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
            <Select placeholder={formatMessage({ id: 'product.category'})}
              style={{
                width: '100%',
              }}
            >
             {
                categories.length!=0?categories.map((c)=>
                <Option value={c.id} label={c.name}>
                <div className="demo-option-label-item">
                 
                  {c.name}
                </div>
              </Option>
                ):null

              }
            </Select>
          </FormItem>
          <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  };

  const renderFooter = () => {
    if (currentStep === 1 ||(currentStep === 2 && newTaxType===false && success===false)) {
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

    if (currentStep === 3 && newTaxType===false && success===false) {
      return (
        <FormItem {...tailLayout}>
          <Button
          
            onClick={backward}
          >
            {formatMessage({ id: 'global.previous'})}
          </Button>
          <Button  type='danger' style={{'margin-left': '8px'}}  onClick={()=>history.goBack()}>{formatMessage({ id: 'global.cancel'})}</Button>
          <Button type="primary" style={{'margin-left': '8px'}}  loading={savingProduct} onClick={() => handleUpdateProduct()}>
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
        <Step title={formatMessage({ id: 'product.initial.stock'})} />
        <Step title={formatMessage({ id: 'product.taxes'})} />
        <Step title={formatMessage({ id: 'global.confirmation.step'})} />
        <Step title={formatMessage({ id: 'global.success.step'})} />
      </Steps>
      <Form
        {...formLayout}
        initialValues={{
          name: formVals.name,
          description: formVals.description,
          unity: formVals.unity,
          availablequantity:formVals.availablequantity,
          category:formVals.category,
          sellprice: formVals.sellprice,
          packagecount: formVals.packagecount,
        
        }}
        form={form}
      >
        {renderContent()}
        {renderFooter()}
      </Form>
      </Card>
   </PageHeaderWrapper>
  );
};

export default  connect(({ product,user }) => ({
  unities: product.unities,
  currentUser:user.currentUser,
  currentProduct:product.currentProduct,
  taxes: product.taxes,
}))(EditProduct);