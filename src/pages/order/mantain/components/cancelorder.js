import { Button,Form,Modal,Alert,Select,Input} from 'antd';
import { formatMessage } from 'umi';
const { TextArea } = Input;
const CancelOrder = ({cancelOrder,
    onClickBack,form,
    visible}) => { 
    const formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 17 },
      };

return <Modal width={800}
visible={visible}
title={  <Alert message={formatMessage({ id: 'order.update'})} description={formatMessage({ id: 'order.update.message'})} type="danger" showIcon />}
footer={[
  <Button key="back" onClick={onClickBack}>
    {formatMessage({ id: 'global.cancel'})}
  </Button>,
  <Button key="submit" type="primary"  onClick={cancelOrder}>
   {formatMessage({ id: 'order.update.status'})}
  </Button>,
]}
closable={true}
onCancel={onClickBack}
>
<Form {...formItemLayout} form={form}> 
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


export default CancelOrder;