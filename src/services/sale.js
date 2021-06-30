import { db } from "./firebase";

export async function findPayments(sucursalId) {

  let newList=[];
 await  db.collection("orders").where("sucursalId","==",sucursalId)
 .where("payment.status","==",confirmed)
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


export async function confirmPayment(order) {
  let payment={...order.payment};
  payment.status='confirmed';
  payment.remarks=order.paymentremarks?order.paymentremarks:'';

  db.collection("orders").doc(order.id).update({payment:payment}).then(function() {
}).catch(function(error) {
    console.error("Error updatetting payment: ", error);
});

}

export async function refundPayment(order) {
let payment={...order.payment};
  payment.status='refunded';
  payment.remarks=order.paymentremarks?order.paymentremarks:'';

  db.collection("orders").doc(order.id).update({payment:payment}).then(function() {
}).catch(function(error) {
    console.error("Error updatetting payment: ", error);
});

}