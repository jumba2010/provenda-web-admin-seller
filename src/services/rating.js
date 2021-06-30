import { db } from "./firebase";
export async function findRatingByproducts(params) {

let newList=[];
 await  db.collection("ratings").where("sucursalId","==",params.sucursalId)
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
