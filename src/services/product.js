import { db, storage } from "./firebase";

export async function findProductsBySucursal(params) {

  let newList = [];
  await db.collection("products").where("seller.id", "==", params.sellerId)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        newList.push(doc.data())
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });


  return newList
}

export async function findStockBySucursal(sucursalId) {
  let newList = [];
  await db.collection("stocks").where("sucursalId", "==", sucursalId)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        newList.push(doc.data())
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });

  return newList
}

export async function findCategoriesBySucursal() {
  let newList = [];
  await db.collection("categories")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        newList.push(doc.data())
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });

  return newList
}

export async function findUnitiesBySucursal() {
  let newList = [];
  await db.collection("unities")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        newList.push(doc.data())
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });

  return newList
}

export async function findSuppliersBySucursal(params) {
  let newList = [];
  await db.collection("suppliers").where("sucursalId", "==", params.sucursalId)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        newList.push(doc.data())
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });

  return newList
}

export async function findTaxesBySucursal(sucursalId) {
  let newList = [];
  await db.collection("taxes").where("sucursalId", "==", sucursalId)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        newList.push(doc.data())
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });

  return newList
}
export async function addTax(params) {
  let { description, value, type, sucursalId } = params;
  let taxid = (new Date).getTime().toString();
  let tax = {};
  tax.description = description;
  tax.value = value;
  tax.id = taxid;
  tax.type = type;
  tax.startdate = new Date();
  tax.sucursalId = sucursalId;
  db.collection('taxes').doc(taxid).set(tax);
}

export async function addProduct(params) {

  let productid = (new Date).getTime().toString();
  let { description,
    name, sellprice,
    taxes, unity, packagecount,
    availablequantity, category, createdBy,
    filenames, seller } = params;

  //preparing to upload the files
  let imageURLs = [];
  for (let index = 0; index < filenames.length; index++) {
    const filename = filenames[index];
    var starsRef = storage.child(filename);

    // Get the download URL
    await starsRef.getDownloadURL().then(function (url) {
      imageURLs.push(url);
    }).catch(function (error) { });
  }

  let product = {};
  let keywords = name.toLowerCase().split(' ');

  product.description = description;
  product.name = name;
  product.sellprice = sellprice;
  product.taxes = taxes;
  product.unity = unity;
  product.category = category;
  product.availablequantity = availablequantity;
  product.filenames = imageURLs;
  product.createdBy = createdBy;
  product.packagecount = packagecount;
  product.normalizedName = name.toLowerCase();
  product.likes = 0;
  product.views = 0;
  product.creationdate = new Date();
  product.id = productid;
  product.active = true;
  product.seller = seller;
  product.keywords = keywords;
  db.collection('products').doc(productid).set(product);

  //create initial stock
  let stock = {};
  let stockid = (new Date).getTime().toString();
  stock.productname = name;
  stock.productid = productid;
  stock.quantity = availablequantity;
  stock.createdAt = new Date();
  stock.availablequantity = availablequantity;
  stock.stocktype = 1;
  stock.packagecount = packagecount;
  stock.sellprice = sellprice;
  stock.sucursalId = seller.id;
  stock.id = stockid;
  db.collection('stocks').doc(stockid).set(stock);

}

export async function updateProduct(params) {
  let { description, productid,
    name, sellprice,
    taxes, unity, packagecount, imageUpdated,
    availablequantity, category,
    filenames } = params;

  console.log('Parametros:', params)
  //preparing to upload the files
  let imageURLs = [];
  if (imageUpdated) {
    console.log('Entrou');
    for (let index = 0; index < filenames.length; index++) {
      const filename = filenames[index];
      var starsRef = storage.child(filename);
      console.log('ImageRef', starsRef);
      // Get the download URL
      await starsRef.getDownloadURL().then(function (url) {
        imageURLs.push(url);
      }).catch(function (error) { });
    }
  }

  let product = {};
  let keywords = name.toLowerCase().split(' ');
  product.description = description;
  product.name = name;
  product.sellprice = sellprice;
  if (taxes.length != 0) { product.taxes = taxes; }
  if (taxes.unity) { product.unity = unity; }
  if (taxes.category) { product.category = category; }
  product.availablequantity = availablequantity;
  if (imageUpdated) {
    product.filenames = imageURLs;
    console.log('Entrou mas nao devia')
  }

  product.packagecount = packagecount;
  product.normalizedName = name.toLowerCase();
  product.keywords = keywords;
  db.collection('products').doc(productid).update(product);

  console.log('Product', product);
  //create initial stock
  let stock = {};
  stock.productname = name;
  stock.quantity = availablequantity;
  stock.availablequantity = availablequantity;
  stock.packagecount = packagecount;
  stock.sellprice = sellprice;

  var stock_query = db.collection('stocks').where("productid", "==", productid);
  stock_query.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      db.collection('stocks').doc(doc.id).update(stock);
    });
  });
  console.log('Stock', stock);
  return product;
}

export async function deleteProduct(product) {

  db.collection("products").doc(product.id).delete().then(function () {

    var stock_query = db.collection('stocks').where("productid", "==", product.id);
    stock_query.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
    });

    for (let index = 0; index < product.filenames.length; index++) {
      const filename = product.filenames[index];

      let fileRef = storage.refFromURL(filename);
      fileRef.delete().then(function () {
      }).catch(console.error);
    }

  }).catch(function (error) {
    console.error("Error removing document: ", error);
  });

}
