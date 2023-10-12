const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const ProductsController = require("../controllers/products");

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, "-") + "_" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
        return cb(null, true);
    }
    return cb(new Error("Invalid file type"), false);
}
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter,
});

router.get("/", ProductsController.get_all_products);
router.post("/", checkAuth, upload.single('productImage'), ProductsController.create_product);
router.get("/:productId", ProductsController.get_product);
router.patch("/:productId", checkAuth, ProductsController.update_product);
router.delete("/:productId", checkAuth, ProductsController.delete_product);

module.exports = router;