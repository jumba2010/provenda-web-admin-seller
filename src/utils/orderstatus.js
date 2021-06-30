import { formatMessage } from 'umi';

  const orderstatus=[{id:'1',code:'pending',des:formatMessage({ id: 'order.pending'})},
{id:'2',code:'processing',des:formatMessage({ id: 'order.preparing'})},
{id:'4',code:'ontheway',des:formatMessage({ id: 'order.ontheway'})},
{id:'5',code:'delivered',des:formatMessage({ id: 'order.delivered'})},
{id:'3',code:'ready',des:formatMessage({ id: 'order.ready'})},
{id:'6',code:'canceled',des:formatMessage({ id: 'order.canceled'})},

];


export default orderstatus;