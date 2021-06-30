import React, { useState } from 'react';
import { Layout, Menu,Row,Col,Form,Input,Upload,Modal,Button,message} from 'antd';
import { connect } from 'dva';
import { formatMessage } from 'umi';
import { BankTwoTone,IdcardTwoTone,MailTwoTone,PlusOutlined,LoadingOutlined } from '@ant-design/icons';
import SecurityView from './components/security';
import NotificationView from './components/notification';
import {G_MAP_KEY} from '../../services/auth';
import MapPicker from 'react-google-map-picker';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const success = () => {
  message.success(formatMessage({id:'user.updated.successfully'}), 5);
};

const loading = () => {
  message.success(formatMessage({id:'global.loading'}),);
};

setInterval(function(){
  //my code
  },60);

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const AccountSetting = (props) => {
  const { loading, currentUser } = props;
  const [visible,setVisible]=useState(false);
  const [currentKey, setCurentKey] = useState('1');
  const [uploading, setUploading] = useState(false);
  const [formVals, setFormVals] = useState({
    name: currentUser.name,
    email: currentUser.email,
    addres: currentUser.address,
    phoneNumber:currentUser.phoneNumber,
    website:currentUser.companyWebsite,
    companyName:currentUser.companyName,
  
  });

  const DefaultLocation = { lat: currentUser.location.latitude, lng: currentUser.location.longitude};
  const DefaultZoom = 10;
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
   const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);
  const [imageUrl, setImageUrl] = useState(currentUser.companyBanner);
  const dispatch = props;
  const [form] = Form.useForm();

  const handleChangeLocation= (lat, lng)=>{
    setLocation({lat:lat, lng:lng});
  }

  const handleUpdateUser =async()=>{
    dispatch({
      type: 'user/update',
      payload: {
        companyBanner: imageUrl,
        companyName: formVals.companyName,
        phoneNumber: formVals.phoneNumber,
        name:formVals.name,
        website:formVals.website,
        addres:formVals.addres,
        sellerId:currentUser.id,
        location:defaultLocation
      },
    });

    message.loading({ content: 'Loading...', key });
    var myVar=setInterval(() => {
      if(!loading){
        message.success({ content: 'User Updated Successfully!', key, duration: 4 });
        clearInterval(myVar);
      }
    }, 600);
  
  }
      
  const handleChangeZoom= (newZoom)=>{
    setZoom(newZoom);
  }

  const uploadButton = (
    <div style={{'width': '128px',
    'height': '128px'}}>
      {uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const props2 = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    listType: 'picture',
    defaultFileList: [],
  };

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setUploading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>{
        setImageUrl(imageUrl);
        setUploading(false);
      }
      );
    }
  };


return (
  <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
  <Sider className="site-layout-background" width={220}>
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%' }}
      onClick={(item)=>{
        setCurentKey(item.key)
      }}
    >
    
<Menu.Item key="1">{formatMessage({id:'basic.settings'})}</Menu.Item>
        <Menu.Item key="2">{formatMessage({id:'security.settings'})}</Menu.Item>
        <Menu.Item key="3">{formatMessage({id:'notification.settings'})}</Menu.Item>
    </Menu>
  </Sider>
  <Content style={{ padding: '0 24px', minHeight: 280 }}> 
  {currentKey==='3'?<NotificationView></NotificationView>:null}
  {currentKey==='2'?<SecurityView></SecurityView>:null}
  {currentKey==='1'?
  <Row>
      <Col span={16}>
      <Form
      {...formItemLayout}
      initialValues={{
        name: formVals.name,
        email: formVals.email,
        address: formVals.address,
        phoneNumber:formVals.phoneNumber,
        website:formVals.website,
        companyName: formVals.companyName,
      
      }}

      form={form}
      name="register"
      scrollToFirstError
    >
  
      <Form.Item
        name="name"
        autoComplete='off' hasFeedback
        label={
          formatMessage({ id: 'user.name'})
        }
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'user.name.required'}),
          },
        ]}
      >
        <Input  prefix={<IdcardTwoTone type='primary' className="site-form-item-icon" />} />
      </Form.Item>

      <Form.Item
        name="email"
        autoComplete='off' 
        hasFeedback
        label="Email"
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'error.username.required'}),
          },
        ]}
      >
        <Input  prefix={<MailTwoTone type='primary' className="site-form-item-icon" /> } />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        autoComplete='off'  type='email'
        label={formatMessage({id:'mobile.number'})}
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'mobile.number.required'}),
          },
        ]}
      >
        <Input prefix='+258'  style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name='companyName' hasFeedback 

      label={formatMessage({id:'company.name'})}
    rules={[
      {
        required: true,
        message: formatMessage({ id: 'company.name.required'}),
      },
    ]}
   >
     <Input autoComplete='off'  prefix={<BankTwoTone type='primary' className="site-form-item-icon" />} id="error" />
   </Form.Item>

   <Form.Item
          name="address"
          label={formatMessage({ id: 'user.address'})}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'user.address.required'}),
            },
          ]}
        >
          <Input.TextArea rows={4} placeholder={formatMessage({ id: 'user.address'})}/>
        </Form.Item>

        <Form.Item label={formatMessage({ id: 'location.name'})} extra={formatMessage({ id: 'select.location'})}>
        <Row gutter={8}>
          <Col span={8}>
            <Form.Item
              name="latitude"
              label={formatMessage({ id: 'location.latitude'})}
              noStyle
              rules={[{ required: true, message: formatMessage({ id: 'select.latitude'}) }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="longitude"
              label={formatMessage({ id: 'location.longitude'})}
              noStyle
              rules={[{ required: true, message: formatMessage({ id: 'select.longitude'}) }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Button onClick={() => setVisible(true)}>{currentUser.active?formatMessage({ id: 'change.location'}):formatMessage({ id: 'set.location'})}</Button>
          </Col>
        </Row>
      </Form.Item>
      <Form.Item
        name="website"
        label="Website"
      >
      <Input />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" onClick={handleUpdateUser}>
         {formatMessage({ id: 'save.changes'})}
        </Button>
      </Form.Item>
    </Form>
      
    <Modal visible={visible}
        title={<>
       <label>{formatMessage({ id: 'location.latitude'})}:</label><input type='text' value={location.lat} disabled/>
  <label>{formatMessage({ id: 'location.longitude'})}:</label><input type='text' value={location.lng} disabled/>
  <label>Zoom:</label><input type='text' value={zoom} disabled/> 
      
        </>}
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1200}
      >
       <MapPicker defaultLocation={defaultLocation}
    zoom={zoom}
    style={{height:'600px',width:'100%'}}
    onChangeLocation={handleChangeLocation} 
    onChangeZoom={handleChangeZoom}
    apiKey={G_MAP_KEY} />
      </Modal>
      </Col>
      <Col span={8}>
        <div style={{'margin-left':'50px','margin-top':'30px'}}>
      <Upload  
      style={{'width': '128px',
        'height': '128px'}}
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{'width': '128px',
    'height': '128px'}} /> : uploadButton}
      </Upload>
     </div></Col>
    </Row>:null}
    </Content>
</Layout>)};
export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  loading: loading.effects['user/update'],
}))(AccountSetting);
