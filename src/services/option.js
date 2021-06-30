import { db ,storage} from "./firebase";
import { truncate } from "lodash";

export async function findOptions(sucursalId) {
  let newList=[];
  await  db.collection("options").where("sucursalId","==",sucursalId)
  .where("active","==",true)
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          newList.push(doc.data())
      });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
  return newList;
}

export async function addOption(params) {
  let id=(new Date).getTime().toString();
  let {name,
    group,price,
    product,imageUrl,description,
    sucursalId,createdBy,activatedBy
    }=params;

     //Obtendo a url da imagem ja carregada
     let imageURL=''
     var starsRef = storage.child(imageUrl);
     // Get the download URL
    await starsRef.getDownloadURL().then(function(url) {
      imageURL=url;
     }).catch(function(error) {});
     
      let option={};
      option.description=description;
      option.name=name;
      option.group=group;
      option.product=product;
      option.price=price;
      option.imageUrl=imageURL;
      option.sucursalId=sucursalId;
      option.createdBy=createdBy;
      option.activatedBy=activatedBy;
      option.creationdate=id;
      option.id=id;
      option.active=true;
      option.sucursalId=sucursalId;
     db.collection('options').doc(id).set(option).then((op)=>{
   
    return op;

    });

    return option;
}

export async function inativateOption(option) {
db.collection("options").doc(option.id).update({active:false}).then(function() {
}).catch(function(error) {
    console.error("Error inativating document: ", error);
});
}