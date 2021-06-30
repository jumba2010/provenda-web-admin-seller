import { Button,Form,Modal,Alert,Input} from 'antd';
import { formatMessage } from 'umi';
const { TextArea } = Input;
const RefundPaymentModal = ({refundPayment,
    onClickBack,form,
    visible}) => {
    const formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 17 },
      };

return <Modal width={800}
visible={visible}
title={  <Alert message={formatMessage({ id: 'refund.reason'})} description={formatMessage({ id: 'refund.confirm'})} type="info" showIcon />}
footer={[
  <Button key="back" onClick={onClickBack}>
    {formatMessage({ id: 'global.cancel'})}
  </Button>,
  <Button key="submit" type="primary"  onClick={refundPayment}>
   {formatMessage({ id: 'payment.pay.out'})}
  </Button>,
]}
closable={false}
onCancel={onClickBack}
>
<Form {...formItemLayout} form={form}> 

      <Form.Item name='remarks' 
      rules= {[{ required: true, message:formatMessage({ id: 'payment.refundreason.required'}), whitespace: true}]}
      label={
  <span>
   {formatMessage({ id: 'refund.reason'})}
  </span>
}>
  <TextArea autoComplete="off"  rows='4'  />
        </Form.Item> 
</Form>
</Modal>

}


export default RefundPaymentModal;