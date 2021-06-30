import React, { useState } from 'react';
import { Form, Button,Input,Spin,
        Result,Select,Upload,Descriptions,Card,
        Steps } from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi';
import { useHistory } from "react-router-dom";
import { connect } from 'dva';
import groups from '../utils/optiongroup';
import {uploadFile,deleteFile} from '../../../utils/fileutils';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const FormItem = Form.Item;
const { Step } = Steps;
const { Option } = Select;
const { Dragger } = Upload;
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

const CreateOption = props => {
  const { products = [],currentUser={}  } = props;
  const [formVals, setFormVals] = useState({
  });
  const [currentStep, setCurrentStep] = useState(0);

  const {dispatch} = props;
  const [savingOtion, setsavingOtion] = useState(false);
  const [groupId, setGroupId]=useState('');
  const [selectedProduct,setSelectedProduct]=useState({});
  const [fileList, setFileList]=useState([]);
  const history = useHistory();
  const [form] = Form.useForm();
  const [fileNameHistories, setFileNameHistories]=useState([]);

  const forward = () => setCurrentStep(currentStep + 1);

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

  const onRemove=(file)=>{
    let newName=fileNameHistories.filter((fh)=>fh.originalName===file.originFileObj.name)[0].newName;
     deleteFile(newName);
   }

  const extra = (
    <>
      <Button onClick={()=>history.push('/options/mantain')}>
      {formatMessage({ id: 'list.options'})}
      </Button>
    </>
  );
  
  const handleNext = async () => {
  const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });
    forward();

  };

  const normFile = e => {
    setFileList(e.fileList);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  

  const changeSelectproduct=(value)=>{
  setSelectedProduct(products.filter((p)=>p.id===value)[0]);
  }

  const changeSelectOption=(value)=>{
    setGroupId(value);
  }

  const handleCreateOption =async()=>{
      setsavingOtion(true);
      let filenames= fileNameHistories.map(a => a.newName);
      dispatch({
        type: 'option/create',
        payload: {
          product: selectedProduct,
          name:formVals.name,
          description:formVals.description,
          price:formVals.price,
          imageUrl:filenames[0],
          group:groups.filter((g)=>g.code===groupId)[0],
          sucursalId:currentUser.id,
          createdBy:currentUser.id,activatedBy:currentUser.id,
        },
      });
if(savingOtion===false){
  forward();
}
     
  }

  const renderContent = () => {

    const layout={
      wrapperCol: { offset: 7, span: 16 },
      
          }

    if (currentStep === 1) {
      return (
        <>
        <Spin indicator={antIcon}  spinning={savingOtion}>
       <Descriptions title={formatMessage({ id: 'product.data'})} column={2} >
       <Descriptions.Item label={formatMessage({ id: 'option.name'})}>{formVals.name}</Descriptions.Item>
                      <Descriptions.Item label={formatMessage({ id: 'option.description'})}>{formVals.description}</Descriptions.Item>
      <Descriptions.Item label={formatMessage({ id: 'option.group'})}>{groups.length!=0?groups.filter((g)=>g.code===groupId)[0].name:''} </Descriptions.Item>
                      <Descriptions.Item label={formatMessage({ id: 'product.name'})}>  {selectedProduct?selectedProduct.name:''} </Descriptions.Item>
                      <Descriptions.Item label={formatMessage({ id: 'product.price'})}> {formVals.price} MZN</Descriptions.Item>
                     
                    </Descriptions>  
                  
         </Spin> 
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
    subTitle= {formatMessage({ id: 'option.registered.successfuly'})}
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
       <FormItem  label={formatMessage({ id: 'option.group'})} 
           rules={[
            {
              required: true,
              message: formatMessage({ id: 'option.group.required'}),
            },
          ]}
          >
  
  <Select 
  
      onChange={changeSelectOption}
      style={{ width: '100%' }}
     
      optionLabelProp="label"
    >
      {
        groups.map((p)=> <Option value={p.code} label={p.name}>
        <div className="demo-option-label-item">
          {p.name}
        </div>
      </Option>)
      }
     </Select> 
          </FormItem>
        <FormItem
          name="name"
          label={formatMessage({ id: 'option.name'})}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'option.name.required'}),
            },
          ]}
        >
          <Input   placeholder={formatMessage({ id: 'group.examples'})}/>
        </FormItem>
      <FormItem name="productlist" label={formatMessage({ id: 'option.product'})} 
           rules={[
            {
              required: true,
              message: formatMessage({ id: 'product.required'}),
            },
          ]} 
        >
<Select 
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

        <FormItem name="price" label={formatMessage({ id: 'product.price'})}
           rules={[
            {
              required: true,
              message: formatMessage({ id: 'error.product.price.required'}),
            },
          ]}
          >
            <Input placeholder=""
             type='number' suffix='MZN'
            />
            
          </FormItem>

          <FormItem
          name="description"
          label={formatMessage({ id: 'option.description'})}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'product.desrcription.required'}),
            },
          ]}
        >
          <Input.TextArea rows={4} placeholder={formatMessage({ id: 'option.description'})}/>
        </FormItem>

        <Form.Item label={formatMessage({ id: 'product.images'})}>
        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
         
        <Dragger {...props}
         fileList={fileList}
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
        {currentStep==1?<Button type="primary"  style={{'margin-left': '8px'}}  onClick={handleCreateOption}>
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
        <Step title={formatMessage({ id: 'option.data'})}/>
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

export default  connect(({ product, user,loading }) => ({
  products: product.products,
  fetching: loading.models.product,
  savingOtion: loading.effects['option/create'],
  currentUser:user.currentUser,
}))(CreateOption);