import React, { useState,useEffect } from 'react';
import { Form, Button,Input, Modal, Select,Divider,message,Descriptions, Table,Steps } from 'antd';
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
import {findUnitiesBySucursal,findTaxesBySucursal,addTax,addProduct} from '../service';
import columns from './taxcolumns'
const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};

const CreateForm = props => {
  const [formVals, setFormVals] = useState({
    name: '',
    desc: '',
    key: '',
    target: '0',
    template: '0',
    type: '1',
    time: '',
    frequency: 'month',
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [newTaxType, setNewTaxType] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savingProduct, setSavingProduct] = useState(false);
  const [unities,setUnities]=useState([]);
  const [selectedRowKeys,setSelectedRowKeys]=useState([]);
  const [selectedTaxes,setSelectedTaxes]=useState([]);

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
     })

     findTaxesBySucursal().then(function (result){
      setTaxes(result) 
     })
    },[]);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const {
    onSubmit: handleCreadeModalVisible,
    onCancel,
    createModalVisible,
  } = props;

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
      message.error('Erro ao processar a requisição');
      setSaving(false);
    }

  }

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
  message.loading('A processar...');
    try {
      setSavingProduct(true);
     await addProduct({
        description: formVals.description,
        barcode:formVals.code,
        name:formVals.name,
        alertquantity:formVals.alertQuantity,
        unityId:formVals.unity,
        taxes:selectedRowKeys,
        sucursalId:1,
        createdBy:1,activatedBy:1,
      });
     
      setSavingProduct(false);
      message.success('Operação realizada com sucesso');
      console.log('Executo1')
      handleCreadeModalVisible(false);
      console.log('Executo2')
      form.resetFields();
      console.log('Executo3')
    } catch (error) {

      console.log("deu erro")
      message.error('Erro ao processar a requisição');
      console.log("deu erro2")
      setSavingProduct(false);
      console.log("deu erro3")
    }

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
                  label="Designação"
                  rules={[
                    {
                      required: true,
                      message: 'A designação do imposto e obrigatoria!',
                    },
                  ]}
                >
                  <Input
              
                    placeholder="Designação .."
                  />
                </FormItem>
                <FormItem name="type" label="Tipo de Imposto">
                <Select
                    style={{
                      width: '100%',
                    }}
                  >
                    <Option value="0">Valor Fixo</Option>
                    <Option value="1">Percentagem</Option>
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
              <Button type='primary' loading={saving} style={{'margin-left': '5px'}}  onClick={saveNewType}>Salvar</Button>
                </FormItem>
                </Form>
             
              </>
            );
          }



    if (currentStep === 1 && newTaxType===false) {
      return (
        <>
<Button type='primary' style={{'margin-left': '76%','margin-button': '50px'}} onClick={addNewTaxType} >Adicionar Imposto/Taxa</Button>
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
       <Descriptions title="Dados do Produto" column={2} >
          <Descriptions.Item label="Nome">{formVals.name}</Descriptions.Item>
                      <Descriptions.Item label="Código">{formVals.code}</Descriptions.Item>
                      <Descriptions.Item label="Unidade">{unities.length!=0?unities.filter((u)=>u.id===formVals.unity)[0].description:''}</Descriptions.Item>
                      <Descriptions.Item label="Quantidade de alerta">{formVals.alertQuantity} {unities.length!=0?unities.filter((u)=>u.id===formVals.unity)[0].description:''}</Descriptions.Item>
                      <Descriptions.Item label="Descrição">{formVals.description}</Descriptions.Item> 
                    </Descriptions>  
                    <Divider ></Divider> 
                    <h3 style={{'margin-top': '15px'}}>
                    IMPOSTOS APLICAVEIS
                    </h3> 
                   
          <Table 
          columns={columns}
         
          dataSource={selectedTaxes}
        /> 
        </>
      );
    }

    return (
      <>
        <FormItem
          name="code"
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
              message: 'O nome do Produto é obrigatório',
            },
          ]}
        >
          <Input placeholder="Nome do Produto" />
        </FormItem>

        <FormItem name="unity" label="Unidade"  rules={[
            {
              required: true,
              message: 'Unidade é obrigatória',
            },
          ]}
     
        >
            <Select
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

          <FormItem name="alertQuantity" label="Quantidade de alerta"
           rules={[
            {
              required: true,
              message: 'A quantidade de alerta é obrigatória',
            },
          ]}
          >
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
          
            onClick={backward}
          >
            Anterior
          </Button>
          <Button  type='danger' onClick={onCancel}>Cancelar</Button>
          <Button type="primary" loading={savingProduct} onClick={() => handleCreateProduct()}>
            Confirmar
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
        padding: '32px 40px 5px',
      }}
      destroyOnClose
      title="Adicionar Produto"
      visible={createModalVisible}
      footer={renderFooter()}
      onCancel={onCancel}
    >
      <Steps
        style={{
          marginBottom: 28
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
     
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateForm;
