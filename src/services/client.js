import { db } from "./firebase";

export async function findClients(sucursalId) {

  let newList=[];
  await  db.collection("clients").where("sellerId","==",sucursalId)
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
