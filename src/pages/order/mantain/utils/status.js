import { formatMessage } from 'umi';

  export  default function getStatus(status) {
    if(status==='pending'){

        return formatMessage({ id: 'order.pending'});
    }

    else  if(status==='processing'){

        return formatMessage({ id: 'order.preparing'});
    }
    else if(status==='ontheway'){

        return formatMessage({ id: 'order.ontheway'});
    }
    else  if(status==='delivered'){

        return formatMessage({ id: 'order.delivered'});
    }

    else  if(status==='canceled'){

        return formatMessage({ id: 'order.canceled'});
    }

    else  if(status==='ready'){

        return formatMessage({ id: 'order.ready'});
    }
    else{
       return  '';
    }
  }