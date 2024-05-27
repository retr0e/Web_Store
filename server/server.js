import express from "express";
import session from "express-session";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.post("/add-to-cart", (req, res) => {
  const product = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    quantity: 1,
  };

  if (!req.session.cart) {
    req.session.cart = [];
  }

  const existingProductIndex = req.session.cart.findIndex(
    (item) => item.id === product.id
  );

  if (existingProductIndex !== -1) {
    req.session.cart[existingProductIndex].quantity += 1;
  } else {
    req.session.cart.push(product);
  }

  res.status(200).send(req.session.cart);
});

app.get("/cart", (req, res) => {
  const cart = req.session.cart || [];
  res.status(200).send(cart);
});

app.post("/update-cart", (req, res) => {
  const { id, increment } = req.body;
  if (!req.session.cart) {
    req.session.cart = [];
  }
  const productIndex = req.session.cart.findIndex((item) => item.id === id);
  if (productIndex !== -1) {
    req.session.cart[productIndex].quantity += increment;
    if (req.session.cart[productIndex].quantity <= 0) {
      req.session.cart.splice(productIndex, 1);
    }
  }
  res.status(200).send(req.session.cart);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
