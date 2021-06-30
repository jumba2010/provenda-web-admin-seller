import React, { useState } from 'react';
import { Form, Button, DatePicker, Table,Input, Modal, Radio, Select, Steps } from 'antd';
import columns from './taxcolumns'
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};

const UpdateForm = props => {
  const [formVals, setFormVals] = useState({
    name: props.values.name,
    barcode: props.values.barcode,
    price: props.values.price,
    alertquantity: props.values.alertquantity,
    unity: props.values.unity,
    unityId: props.values.unityId,
    description:props.values.description,
    id: props.values.id,
  });


  const [currentStep, setCurrentStep] = useState(0);
  const [newTaxType, setNewTaxType] = useState(false);

  const [form] = Form.useForm();
  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    onCancel,
    values,
    unities,
  } = props;

 
  const forward = () => setCurrentStep(currentStep + 1);

  const backward = () => setCurrentStep(currentStep - 1);
  const addNewTaxType=()=>setNewTaxType(true);

  const saveNewType=async ()=>{
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });

  }

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });

    if (currentStep < 2) {
      forward();
    } else {
      handleUpdate(formVals);
    }
  };
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
              <Form {...layout}> 
              
      <FormItem
                  name="designation"
                  label="Designação"
                  rules={[
                    {
                      required: true,
                      message: 'A designação do imposto e obrigatoria!',
                    },
                  ]}
                >
                  <Input
              
                    placeholder="Designacao .."
                  />
                </FormItem>
                <FormItem name="type" label="Tipo de Imposto">
                <Select
                    style={{
                      width: '100%',
                    }}
                  >
                    <Option value="0">Valor Fixo</Option>
                    <Option value="1">Percentage</Option>
                  </Select>
                </FormItem>
      
                <FormItem
                  name="value"
                  label="Valor"
                  rules={[
                    {
                      required: true,
                      message: 'O valor  do imposto e obrigatorio!',
                    },
                  ]}
                >
                  <Input type='number' />
                </FormItem>
      
                <FormItem {...tailLayout} >
              <Button onClick={()=>setNewTaxType(false)} >Cancelar</Button>
              <Button type='primary' style={{'margin-left': '5px'}}  onClick={saveNewType}>Salvar</Button>
                </FormItem>
                </Form>
             
              </>
            );
          }



    if (currentStep === 1 && newTaxType===false) {
      return (
        <>
<Button type='primary' style={{'margin-left': '80%','margin-button': '20px'}} onClick={addNewTaxType} >Adicionar Novo tipo</Button>
<Table
          columns={columns}
          rowSelection={{}}
        />
       
        </>
      );
    }

    if (currentStep === 2) {
      return (
        <>
          <FormItem
            name="time"
            label="开始时间"
            rules={[
              {
                required: true,
                message: '请选择开始时间！',
              },
            ]}
          >
            <DatePicker
              style={{
                width: '100%',
              }}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="选择开始时间"
            />
          </FormItem>
          <FormItem name="frequency" label="调度周期">
            <Select
              style={{
                width: '100%',
              }}
            >
              <Option value="month">月</Option>
              <Option value="week">周</Option>
            </Select>
          </FormItem>
        </>
      );
    }

    return (
      <>
        <FormItem
          name="barcode"
          label="Código"
          rules={[
            {
              required: true,
              message: 'o código do Produto é obrigatório',
            },
          ]}
        >
          <Input placeholder="Código do Produto" />
        </FormItem>

        <FormItem
          name="name"
          label="Nome"
          rules={[
            {
              required: true,
              message: 'o nome do Produto é obrigatório',
            },
          ]}
        >
          <Input placeholder="Nome do Produto" />
        </FormItem>

        <FormItem name="unity" label="Unidade"
     
        >
            <Select
              style={{
                width: '100%',
              }}
            >
              {
                unities.map((u)=>
              <Option value={u.code}>{u.description}</Option>
                )

              }
             
            </Select>
          </FormItem>

          <FormItem name="alertquantity" label="Quantidade de alerta">
            <Input
             type='number'
            />
            
          </FormItem>
          

        <FormItem
          name="description"
          label="Descrição"
          rules={[
            {
              required: true,
              message: 'A Descrição é obrigatória',
              min: 5,
            },
          ]}
        >
          <TextArea rows={4} placeholder="Descrição" />
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    if (currentStep === 1) {
      return (
        <>
          <Button
          
            onClick={backward}
          >
            Anterior
          </Button>
          <Button  type='danger' onClick={onCancel}>Cancelar</Button>
          <Button type="primary" onClick={() => handleNext()}>
            Proximo
          </Button>
        </>
      );
    }

    if (currentStep === 2) {
      return (
        <>
          <Button
            style={{
              float: 'left',
            }}
            onClick={backward}
          >
            Anterior
          </Button>
          <Button type='danger' onClick={onCancel}>Cancelar</Button>
          <Button type="primary" onClick={() => handleNext()}>
            Proximo
          </Button>
        </>
      );
    }

    return (
      <>
        <Button  type='danger' onClick={onCancel}>Cancelar</Button>
        <Button type="primary" onClick={() => handleNext()}>
          Proximo
        </Button>
      </>
    );
  };
  
  return (
    <Modal
    width={850}
    style={{ top: 20 }}
      bodyStyle={{
        padding: '32px 40px 48px',
      }}
      destroyOnClose
      title="Adicionar Produto"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >
  <Steps
        style={{
          marginBottom: 28,
        }}
        size="small"
        current={currentStep}
      >
        <Step title="Dados do Produto" />
        <Step title="Taxas e Impostos" />
        <Step title="Confirmação" />
      </Steps>
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          name: formVals.name,
          barcode: formVals.barcode,
          unity: formVals.unity,
          description: formVals.description,
          price: formVals.price,
          alertquantity: formVals.alertquantity,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
