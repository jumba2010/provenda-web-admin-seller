
export default function getBadge (status) {
    if(status==='received'){

        return 'default';
    }

    else  if(status==='processing'){

        return 'processing';
    }
    else if(status==='ontheway'){

        return 'warning';
    }

    else if(status==='canceled'){

        return 'error';
    }
   else  if(status==='delivered' || status==='ready'){

        return 'success';
    }
else{
    return 'dafault';
}

  }