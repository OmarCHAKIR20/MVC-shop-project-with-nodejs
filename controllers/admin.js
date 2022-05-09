const Product = require("../models/product");




exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
  //res.sendFile(path.join(rootDir, "views", "add-product.html"));
};

exports.postAddProdcut = (req, res, next) => {
  const prodId = req.body.productId;
  const title = req.body.title;
  const price = req.body.price;
  const image = req.body.image;
  const description = req.body.description;
  const product = new Product(title , price , description , image , null  , req.user._id );
 product
 .save()
 .then(result=>{
    console.log("success mssg")
    res.redirect('/admin/products')
  }).catch(err=>{
  console.log(err)
  })
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(products=>{
    res.render("admin/products", {
      prods: products,
      pageTitle: "admin Products",
      path: "/admin/products",
    });
  })
  .catch(err=>{
    console.log(err)
  })
  
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
  .then(product =>{
    
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "edit Product",
      path: "/admin/edit-product",
      product: product,
      editing: editMode,
    })
  })

};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;
  const updatedImage = req.body.image;
   const product = new Product(updatedTitle , updatedPrice  ,  updatedDesc  , updatedImage , prodId )
   product
   .save()
  .then(()=>{
    console.log("successfuly updated");
    res.redirect("/admin/products");
  })
  .catch(err=>{
    console.log(err)
  });
 

};

exports.postDeleteProduct = (req , res , next)=>{
  const prodId = req.body.productId;
  Product.deleteById(prodId)
  .then(()=>{
     res.redirect('/admin/products');
  })
  .catch(err=>{
    console.log(err);
  })
 
}

/*exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  req.user.getProducts({where :{id : prodId}})
  .then(products =>{
    const product = products[0];
    console.log(product);
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "edit Product",
      path: "/admin/edit-product",
      product: product,
      editing: editMode,
    })
  })

};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImage = req.body.image;
  const updatedDesc = req.body.description;
 Product.findByPk(prodId)
 .then(product=>{
   product.title = updatedTitle;
   product.price = updatedPrice;
   product.description = updatedDesc;
   product.imageUrl = updatedImage;
   return product.save()
 })
  .then(result=>{
    console.log("successfuly updated");
    res.redirect("/admin/products");
  })
  .catch(err=>{
    console.log(err)
  });
 

};




*/