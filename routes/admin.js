const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");

//ADMIN/ADD-PRODUCT ==> GET
router.get("/add-product", adminController.getAddProduct);

//ADMIN/ADD-PRODUCT ==> POST
router.post("/add-product", adminController.postAddProdcut);

router.get("/products", adminController.getProducts);

router.get("/edit-product/:productId", adminController.getEditProduct);

router.post("/edit-product", adminController.postEditProduct);

router.post("/delete-product" , adminController.postDeleteProduct);

/*



*/

module.exports = router;
