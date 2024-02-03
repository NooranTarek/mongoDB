//- Display number of products per category.
db.products.aggregate([
  {
    $group: {
      _id: "$category",
      productCount: { $sum: 1 }
    }
    
  },
   { $match : {_id: {$ne:null}}}
]);
  
//- Display max category products price.
db.products.aggregate([
  {
    $group: {
      _id: "$category",
      maxPrice: { $max: "$price" }
    }
  },
   { $match : {_id: {$ne:null}}}
]);
  
  
//- Display user ahmed orders populated with product.
db.users.aggregate([
  {
    $match: {
      name: "ahmed"
    }
  },
  {
    $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "userId",
      as: "ahmedOrders"
    }
  },
  {
    $lookup: {
      from: "products",
      localField: "ahmedOrders.productsIds",
      foreignField: "_id",
      as: "ahmedProducts"
    }
  },
  {
    $project: {
      _id: 0,
      name: 1,
      ahmedOrders: 1,
      ahmedProducts: 1,
        
    }
  }
]);
 

//- Get user ahemd highest order price
db.users.aggregate([
  {
    $match: {
      name: {
        $eq: "ahmed"
      }
    }
  },
  {
    $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "userId",
      as: "ahmedOrders"
    }
  },
  {
    $unwind: "$ahmedOrders"
  },
  {
    $lookup: {
      from: "products",
      localField: "ahmedOrders.productsIds",
      foreignField: "_id",
      as: "ahmedProducts"
    }
  },
  {
    $unwind: "$ahmedProducts"
  },
  {
    $group: {
      _id: "$_id",
      name: { $first: "$name" },
      maxProductPrice: { $max: "$ahmedProducts.price" }
    }
  }
]);

//___________________________________________________________________________________


  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
