const express = require("express");
const router = express.Router();
const { generateUniqueId } = require("../config/utils");

router.use(express.json());

// Mock de la base de datos de carritos (usando un array por ahora)
let carts = [];

// Ruta raíz POST /api/carts/
router.post("/", (req, res) => {
  // Crear un nuevo carrito con un id único
  const id = generateUniqueId();
  const newCart = { id, products: [] };
  carts.push(newCart);
  res.status(201).json(newCart);
});

// Ruta GET /api/carts/:cid
router.get("/:cid", (req, res) => {
  const { cid } = req.params;
  // Buscar el carrito por su id (cid)
  const cart = carts.find((cart) => cart.id === cid);
  if (!cart) {
    return res.status(404).json({ message: "Carrito no encontrado" });
  }
  res.json(cart);
});

// Ruta POST /api/carts/:cid/product/:pid
router.post("/:cid/product/:pid", (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  // Buscar el carrito por su id (cid)
  const cart = carts.find((cart) => cart.id === cid);
  if (!cart) {
    return res.status(404).json({ message: "Carrito no encontrado" });
  }

  const existingProductIndex = cart.products.findIndex(
    (item) => item.product === pid
  );
  if (existingProductIndex !== -1) {
    cart.products[existingProductIndex].quantity += quantity || 1;
  } else {
    cart.products.push({ product: pid, quantity: quantity || 1 });
  }

  res.json(cart);
});

module.exports = router;
