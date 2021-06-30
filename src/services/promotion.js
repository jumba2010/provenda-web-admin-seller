import { db } from "./firebase";

export async function findPromotions(sucursalId) {

  let newList=[];
  await  db.collection("promotions").where("sucursalId","==",sucursalId)
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

export async function addPromotion(params) {
  let promotionid=(new Date).getTime().toString();
  let {description,
    startdate,enddate,
    percentage,applytoall,products,
    sucursalId,createdBy,activatedBy
    }=params;

      let promotion={};
      promotion.description=description;
      promotion.startdate=startdate;
      promotion.enddate=enddate;
      promotion.percentage=percentage;
      promotion.applytoall=applytoall;

      if(!applytoall){
        promotion.products=products;
      }
      promotion.sucursalId=sucursalId;
      promotion.createdBy=createdBy;
      promotion.activatedBy=activatedBy;
      promotion.creationdate=new Date();
      promotion.id=promotionid;
      promotion.active=true;
      promotion.sucursalId=sucursalId;
    db.collection('promotions').doc(promotionid).set(promotion).then((promotion)=>{
    return promotion;

    });

    //actualiza os precos dos produtos
    for (let index = 0; index < products.length; index++) {
      const product = products[index];
      db.collection("products").doc(product.id).update({promotionalprice:product.promotionalprice,discount:product.discount}).then(function() {
        }).catch(function(error) {
            console.error("Error updating document: ", error);
        }); 
    }
   
    return promotion;
}

export async function inativatePromotion(promotion) {
  db.collection("promotions").doc(promotion.id).update({active:false}).then(function() {

}).catch(function(error) {
    console.error("Error inativating document: ", error);
});
}