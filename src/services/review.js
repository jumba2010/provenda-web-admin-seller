import { db } from "./firebase";

export async function fetchMarketReviews(sucursalId) {

  let newList=[];
  await  db.collection("marketreviews").where("marketId","==",sucursalId)
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


export async function fetchProductReviews(sucursalId) {

  let newList=[];
  await  db.collection("productreviews").where("marketId","==",sucursalId)
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
