import { storage } from "../services/firebase";

export async function uploadFile(file) {
    //rename the file object
    let filename = (new Date()).getTime().toString()+'.'+file.name.split('.').pop();
    let metadata = {
      contentType: file.type
    };

    //upload the file with the new name
    let task =  storage.child(filename).put(file, metadata);
    task
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then((url) => {
       return url;
      })
      .catch(console.error);

     return filename;
  }

export  function deleteFile(finename){
var desertRef = storage.child(finename);
 desertRef.delete().then(function() {
}).catch(console.error);
}