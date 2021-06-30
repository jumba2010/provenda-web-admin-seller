import request from '@/utils/request';
import { auth, db } from "./firebase";

export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  let userdata={};
  let user=auth().currentUser;
  if (user != null) {
    await  db.collection("sellers").where("email","==",user.email)
    .get()
    .then(async function(querySnapshot) {
        querySnapshot.forEach(async function(doc) {
          userdata=doc.data();
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  
  
  }
  return userdata;

}

export async function queryNotices() {
  return request('/api/notices');
}

export async function signup(params) {

  let {email,
    name,password,
    latitude,longitude,countryCode,contactPrefix,phoneNumber
    }=params;
  auth().createUserWithEmailAndPassword(email, password).then(function() {
    auth().signInWithEmailAndPassword(email, password);


    let sellerId=(new Date).getTime().toString();
      let seller={};
      seller.id=sellerId;
      seller.name=name;
      seller.email=params.email;
      seller.location={latitude:latitude,longitude:longitude}
      seller.countryCode=countryCode;
      seller.phonePrefix=contactPrefix;
      seller.phoneNumber=phoneNumber;
      seller.companyBanner='https://firebasestorage.googleapis.com/v0/b/pesquisadeprecos-5f45a.appspot.com/o/default_company.png?alt=media&token=476ceb41-64f2-4d8a-b2c1-a1b5d366f5b4'
      seller.photoURL='';
      seller.sucursals=[{
      id:sellerId,
      location:{latitude:latitude,longitude:longitude},
      banner:'https://firebasestorage.googleapis.com/v0/b/pesquisadeprecos-5f45a.appspot.com/o/default_company.png?alt=media&token=476ceb41-64f2-4d8a-b2c1-a1b5d366f5b4'
      }]

      db.collection('sellers').doc(sellerId).set(seller);

sendVerificationEmail();
signOut();

  }).catch(function(err){

    console.log(err)
    return err;
  });

  

}

export async function signin(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}

export async function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
}

export async function saveCurrentUser(latitude,longitude,contactPrefix,countryCode) {
  //Save the user the first time he longs in by google
  let user=auth().currentUser;
  if (user != null) {
    await  db.collection("sellers").where("email","==",user.email)
    .get()
    .then(function(querySnapshot) {
      if (querySnapshot.empty) {
     //Create the user for the first time
        let seller={};
        let sellerId=(new Date).getTime().toString();
        user.providerData.forEach(function (profile) {
          seller.id=sellerId;
          seller.name=profile.displayName;
          seller.email=profile.email;
          seller.location={latitude:latitude,longitude:longitude}
          seller.countryCode=countryCode;
          seller.phonePrefix=contactPrefix;
          seller.companyBanner='https://firebasestorage.googleapis.com/v0/b/pesquisadeprecos-5f45a.appspot.com/o/default_company.png?alt=media&token=476ceb41-64f2-4d8a-b2c1-a1b5d366f5b4'
          seller.photoURL=profile.photoURL;
          seller.sucursals=[{
          id:sellerId,
          location:{
          latitude:latitude,longitude:longitude},
                   banner:'https://firebasestorage.googleapis.com/v0/b/pesquisadeprecos-5f45a.appspot.com/o/default_company.png?alt=media&token=476ceb41-64f2-4d8a-b2c1-a1b5d366f5b4'
          }]
       
        });
    
    db.collection('sellers').doc(sellerId).set(seller);
    } else {
        // do nothing because the user is already registered
    }

    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
   
}

  return user;
}


export async function getCurrentUser() {
  return auth().currentUser;
}

export async function signOut() {
 auth().signOut().then(function() {
  }).catch(function(error) {
    console.log(error)
  });
 
}

export async function updateUser(params) {
  const {name,location,companyBanner,phoneNumber,addres,sellerId}=params;

    let seller={};
      seller.location={latitude:latitude,longitude:longitude}
      seller.companyBanner=companyBanner;
      seller.contact=phoneNumber;
      seller.companyName=name;
      seller.addres=addres;
      seller.website=website;
      seller.updated=true;
      seller.updatedAt=String(new Date().getTime());
      seller.sucursals=[{
      id:sellerId,
      location:{
      latitude:location.lat,longitude:location.lng},
      name:name,
      banner:companyBanner
      }];

db.collection('sellers').doc(sellerId).update(seller);   
  return seller;
}


export async function sendVerificationEmail() {
  var user = auth().currentUser;

  user.sendEmailVerification().then(function() {
  }).catch(function(error) {
    console.log(error)
  });

  return user;
}

export async function updateUserPassword(newPassword) {
  var user = auth().currentUser;
  user.updatePassword(newPassword).then(function() {
  }).catch(function(error) {
    console.log(error)
  });

  return user;
}

export async function sendPasswordResetEmail(emailAddress) {
  auth().sendPasswordResetEmail(emailAddress).then(function() {
  }).catch(function(error) {
    console.log(error)
  });

  return user;
}

export async function deleteUser() {
  var user = firebase.auth().currentUser;
  user.delete().then(function() {
  }).catch(function(error) {
    // An error happened.
  });

  return user;
}