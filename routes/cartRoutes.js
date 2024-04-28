const express = require("express");
const router = express.Router();
const CartManager = require("../src/dao/CartManager");
const ProductManager = require("../src/dao/ProductManager");
const logger = require("../logger");

router.post("/add", async (req, res) => {
  try {
    const { cartId, productId, quantity } = req.body;

    const cartExists = await CartManager.getCart(cartId);
    if (!cartExists) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    const productExists = await ProductManager.getProduct(productId);
    if (!productExists) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    if (productExists.stock < quantity) {
      return res
        .status(400)
        .json({ message: "No hay suficiente stock disponible" });
    }

    const addedToCart = await CartManager.addProductToCart(
      cartId,
      productId,
      quantity
    );
    if (addedToCart) {
      res
        .status(200)
        .json({ message: "Producto agregado al carrito exitosamente" });
    } else {
      res
        .status(500)
        .json({
          message:
            "Error interno del servidor al agregar el producto al carrito",
        });
    }
  } catch (error) {
    logger.error("Error al agregar el producto al carrito:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
