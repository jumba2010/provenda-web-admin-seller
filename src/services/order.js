import { db } from "./firebase";

export async function findOrders(sucursalId) {

  let newList=[];
  
 await  db.collection("orders").where("seller.id","==",sucursalId)
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          newList.push(doc.data())
      });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });

  return newList
}


export async function cancelOrder(order) {
  db.collection("orders").doc(order.id).update({active:false,updatedAt:new Date().getTime()}).then(function() {
}).catch(function(error) {
    console.error("Error inativating document: ", error);
});

}

export async function confirmOrder(order) {
  console.log('Order:',order)
  db.collection("orders").doc(order.id.trim()).update({status:order.status,remarks:order.remarks?order.remarks:'',updatedAt:new Date().getTime()}).then(function() {
  }).catch(function(error) {
    console.error("Error inativating document: ", error);
});

}