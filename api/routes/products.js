const express = require("express");
const router = express.Router();
const multer = require("multer");
const productController = require("../controllers/product");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const fileFilter = (req, res, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else cb(null, false);
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  filterFilter: fileFilter
});

const checkAuth = require("../middleware/check-auth");

//SHOW ALL PRODUCTS
router.get("/", productController.products_get_all);

//ADD PRODUCT
router.post(
  "/",
  upload.single("productImage"),
  productController.products_create_product
);

//SHOW SINGLE PRODUCT
router.get("/:productId", productController.products_get_product);

//UDDATE PRODUCT
router.patch("/:productId", productController.products_update_product);

//DELETE PRODUCT
router.delete("/:productId", productController.products_delete);

module.exports = router;
