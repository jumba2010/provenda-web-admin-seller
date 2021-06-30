import { formatMessage } from 'umi';

  export  default function filteredorderstatus(status,statuslist) {

   var newList= statuslist.filter((s)=>s.code!=status);
   
    if(status==='pending'){
        return  newList.filter((s)=>s.code==='processing');
    }

    else  if(status==='processing'){

        return  newList.filter((s)=>s.code==='ready');
    }
    else if(status==='ready'){

        return  newList.filter((s)=>s.code==='delivered' || s.code==='ontheway' );
    }
    else  if(status==='ontheway'){

        return  newList.filter((s)=>s.code==='delivered');
    }

    else{
       return  [];
    }
  }