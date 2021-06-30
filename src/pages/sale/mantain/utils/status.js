import { formatMessage } from 'umi';

  export  default function getStatus(status) {
  if(status==='confirmed'){
        return formatMessage({ id: 'payment.confirmed'});
    }
    else if(status==='pending'){
        return formatMessage({ id: 'payment.unconfirmed'});
    }
  
    else{
       return  '';
    }
  }