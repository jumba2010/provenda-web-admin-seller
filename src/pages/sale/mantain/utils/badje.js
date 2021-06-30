
export default function getBadge (status) {
 
if(status==='pending'){

        return 'warning';
    }
   else  if(status==='confirmed'){

        return 'success';
    }
else{
    return 'dafault';
}

  }