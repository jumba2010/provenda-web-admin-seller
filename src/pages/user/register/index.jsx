import { MailTwoTone,IdcardTwoTone ,LockTwoTone,BankTwoTone,PhoneTwoTone,LockOutlined} from '@ant-design/icons';
import { Form, Input,Card,Alert, Button,Result ,Checkbox} from 'antd';
import React, { useState,useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'umi';
import styles from './style.less';
import { formatMessage } from 'umi';
import GoogleButton from 'react-google-button';
import api from '../../../services/api';
import scorePassword from './utils/passwordstrength';
import { signup, signInWithGoogle,saveCurrentUser } from "../../../services/user";

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const Register = props => {
  const { userLogin = {}, submitting } = props;
  const [currentStep, setCurrentStep] = useState(0);
  const [formVals,setFormVals]=useState({});
  const [countryCode,setCountryCode]=useState('');
  const [contactPrefix,setContactPrefix]=useState('');
  const [latitude,setLatitude]=useState('');
  const [longitude,setLongitude]=useState('');
  const [alternlatitude,setAlternlatitude]=useState('');
  const [alternlongitude,setAlternlongitude]=useState('')
  const [signedbygoogle, setSignedbygoogle] = useState(false);
  const [googleerror, setGoogleerror] = useState('');
  const history = useHistory();
  const dispatch =props;

  const [form] = Form.useForm();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function(position){
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      }
          );
 
    api.get('https://ipapi.co/json/').then((response) => {
    setAlternlatitude(response.data.longitude);
    setAlternlongitude(response.data.longitude);
    setContactPrefix(response.data.country_calling_code);
    setCountryCode(response.data.country_code)
 }).catch((error) => {
  console.log(error);
 });

   },[]);


  const handleSubmit =async( )=> {

    const fieldsValue = await form.validateFields();
    dispatch({
      type: 'user/create',
      payload: {
        latitude: latitude?latitude:alternlatitude,
        name:fieldsValue.name,
        longitude:longitude?longitude:alternlongitude,
        contactPrefix:contactPrefix,
        countryCode,
        email:fieldsValue.email,
        password:fieldsValue.password,
        phoneNumber:fieldsValue.phoneNumber
      },
    });
    setCurrentStep(1);
 
  };

  const extra = (
    <>
      <Button type="primary" onClick={()=>history.push("/user/login")}>
  {formatMessage({id:'user.login'})}
      </Button> 
    </>
  );

  const googleSignIn=async() =>{
    try {
      await signInWithGoogle();
      saveCurrentUser(latitude?latitude:alternlatitude,longitude?longitude:alternlongitude,contactPrefix,countryCode);
      dispatch({
        type: 'user/fetchCurrent',
      });

    history.push("/welcome"); 
    } catch (error) {
      setGoogleerror(error.message);
    }
  }

  if (currentStep === 0) {
    return (
      
    <div className={styles.main}>
      <Card>
      {googleerror  && (
            <LoginMessage content={googleerror} />
          )}
      <Form form={form} >
      <Form.Item name='name' autoComplete='off' hasFeedback
    rules={[
      {
        required: true,
        message: formatMessage({ id: 'user.name.required'}),
      },
    ]}
   >
     <Input  size='large'  prefix={<IdcardTwoTone type='primary' className="site-form-item-icon" />} placeholder={formatMessage({id:'user.name'})} id="error" />
   </Form.Item>

   <Form.Item name='email' hasFeedback
    rules={[
      {
        required: true,
        message: formatMessage({ id: 'error.username.required'}),
      },
    ]}
   >
     <Input autoComplete='off' size='large' type='email'  prefix={<MailTwoTone type='primary' className="site-form-item-icon" /> } placeholder="Email" id="error" />
   </Form.Item>
    <Form.Item name='phoneNumber' hasFeedback
    rules={[
      {
        required: true,
        message: formatMessage({ id: 'mobile.number.required'}),
      },
    ]}
    >
      <Input autoComplete='off' size='large' type='number'  prefix={contactPrefix} placeholder={formatMessage({id:'mobile.number'})} id="error" />
    </Form.Item>

    <Form.Item  hasFeedback   name='password'
    rules={[
                    {
                      required: true,
                      message: formatMessage({ id: 'error.password.required'}),
                    },

                    () => ({
                      validator(rule, value) {
                        var score = scorePassword(value);
                        if (score<60) {

                          return Promise.reject(formatMessage({id:'weak.password'}));
                         
                        }

                        else{
                          return Promise.resolve();
                        }
                        
                      },
                    }),
                  ]}>
      <Input.Password autoComplete='off' type='primary' size='large' prefix={<LockTwoTone className="site-form-item-icon" />} placeholder="Password" />
    </Form.Item>

    <Form.Item   hasFeedback name='repeatpassword'
  

    rules={[
      {
        required: true,
        message: formatMessage({ id: 'error.repeatpassword.required'}),
      },
      ({ getFieldValue }) => ({
        validator(rule, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }
          return Promise.reject(formatMessage({id:'password.does.not.match'}));
        },
      }),
    ]}
    >
      <Input.Password  autoComplete='off'size='large' prefix={<LockTwoTone className="site-form-item-icon" />} placeholder={formatMessage({ id: 'repeat.password'})} />
    </Form.Item>
    <div style={{'margin-bottom':'10px'}}>
          <Checkbox  >
          {formatMessage({ id: 'read.andaccept'})}
          </Checkbox>
        
        </div>

    <Form.Item>
        <Button onClick={handleSubmit} type="primary" style={{'width':'100%'}} size='large' htmlType="submit" className="login-form-button">
        {formatMessage({ id: 'user.ignup'})}
        </Button>
     
      </Form.Item>

      <GoogleButton style={{width:'100%'}} onClick={googleSignIn}
       label={formatMessage({ id: 'signup.withgoogle'})}
       ></GoogleButton>
  </Form>
  <div className={styles.other}>
       
       <Link className={styles.register} to="/user/login">
         {formatMessage({ id: 'user.haveanaccount.asignin'})}
       </Link>
     </div>
     </Card>
     <div style={{'padding-top':'20px'}}>
      <a >{formatMessage({ id: 'terms.ofuse.andprivacy'})}</a>
      </div>
    </div>
  )};

  if (currentStep === 1) {
    return (
      <>
     <Form {...formItemLayout} style={{ padding: '50px 0' }}>
<Result
  status="success"
  title= {formatMessage({ id: 'account.created.successfuly'})}
  subTitle= {signedbygoogle?formatMessage({ id: 'usercreated.bygoogle.sucessfully'}):formatMessage({ id: 'verification.email.send'})}
  extra={extra}
  />
<Form.Item >

      
      </Form.Item>
    </Form>
    
      </>
    );
  }
};

export default Register;
