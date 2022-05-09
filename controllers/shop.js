const Product = require("../models/product");


exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "My shop",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
  .then((products) => {
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your cart",
        products: products,
      });
    })
    .catch(err=>{
      console.log(err)
      
  });

  /*Cart.getCart(cart=>{
    Product.fetchAll(products=>{
      const cartProducts = [];
      for(product of products){
        const cartProductData = cart.products.find(prod => prod.id === product.id)
         if (cartProductData) {
             cartProducts.push({ productData : product , qty : cartProductData.qty })
         }
      }
      res.render("shop/cart", 
      { path: "/cart",
       pageTitle: "Your cart",
       products : cartProducts
       });
    })
  })*/
};

 exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
  .then(product =>{
     return req.user.addToCart(product)
  })
  .then(result=>{
    
    return res.redirect('/cart')
  })
  .catch(err=>{
    console.log(err)
  })
}; 

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "checkout",
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.fetchAll({ where: { id: prodId } })
    .then((product) => {
      res.render("shop/product-detail", {
        prod: product[0],
        pageTitle: product[0].title,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
    req.user.deleteItemFromCart(prodId)
    .then(result=>{
      res.redirect('/cart')
    })
    .catch(err=>{
      console.log(err)
    })
};

exports.postOrder =(req , res , next)=>{
     req.user
     .addOrder()
     .then(result=>{
       res.redirect('/orders')
     })
     .catch(err=>{
       console.log(err)
     })
}

exports.getOrders=(req , res , next)=>{
      req.user
      .getOrders()
      .then(orders=>{
         res.render('shop/orders',{
         path:'/orders',
         pageTitle : 'Your orders',
         orders : orders
       })
      })
      .catch(err=>{
        console.log(err);
      })
       
}