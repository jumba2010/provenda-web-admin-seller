import { Button,Form,Modal,Alert,Select,Input} from 'antd';
import { formatMessage } from 'umi';
const { TextArea } = Input;
const ConfirmOrderModal = ({confirmOrder,
    onClickBack,form,canceled,
    orderstatus,
    handleSelectStatus,
    visible}) => { 
    const formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 17 },
      };

return <Modal width={800}
visible={visible}
title={  <Alert message={formatMessage({ id: 'order.update'})} description={formatMessage({ id: 'order.update.message'})} type="info" showIcon />}
footer={[
  <Button key="back" onClick={onClickBack}>
    {formatMessage({ id: 'global.cancel'})}
  </Button>,
  <Button key="submit" type="primary"  onClick={confirmOrder}>
   {formatMessage({ id: 'order.update.status'})}
  </Button>,
]}
closable={false}
onCancel={onClickBack}
>
<Form {...formItemLayout} form={form}> 
<Form.Item label= {formatMessage({ id: 'order.status'})} name='orderStatus'
rules={[{ required: true, message: formatMessage({ id: 'order.status.required'})}]}

>
<Select
   showSearch
   placeholder={formatMessage({id:'select.the.status'})}
   optionFilterProp="children"
   onChange={handleSelectStatus}
              filterOption={(input, option) =>
     option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
   }
 >
   {orderstatus.map((s)=><Option value={s.code}> {s.des}</Option>)}
</Select>       
</Form.Item>
      <Form.Item name='remarks' 
      label={
  <span>
   {formatMessage({ id: 'sale.remarks'})}
  </span>
}>
  <TextArea autoComplete="off"  rows='4'  />
        </Form.Item> 
</Form>
</Modal>

}


export default ConfirmOrderModal;