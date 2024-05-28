import express from "express";
import cors from "cors";
import pg from "pg";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();
const PORT = 3000;
const JWT_SECRET = "your_jwt_secret";

// Database connection
const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "store",
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: "your_session_secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // Add cookie-parser middleware

app.post("/add-product", async (req, res) => {
  const {
    // category_id,
    name,
    price,
    description,
    // tax_include,
    // short_description,
    // medium_description,
    // long_description,
    // location,
    // file_name,
  } = req.body;

  try {
    // Insert into Descriptions table
    const descriptionQuery = `
      INSERT INTO Descriptions (short_description, medium_description, long_description)
      VALUES ($1, $2, $3)
      RETURNING id_description;
    `;
    await pool.query(descriptionQuery, [description, description, description]);
    // // eslint-disable-next-line no-unused-vars
    // const descriptionId = descriptionResult.rows[0].id_description;

    // Insert into Products table
    const productQuery = `
      INSERT INTO Products (id_category, name, price, tax_include, sellable)
      VALUES ($1, $2, $3, $4, TRUE)
      RETURNING id_product;
    `;
    await pool.query(productQuery, [1, name, price, price]);
    console.log("leciii!");
    // const productId = productResult.rows[0].id_product;

    // Insert into Pictures table
    // const pictureQuery = `
    //   INSERT INTO Pictures (id_product, location, file_name)
    //   VALUES ($1, $2, $3);
    // `;
    // await pool.query(pictureQuery, [productId, location, file_name]);

    res.status(201).send("Product added successfully");
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send("Error adding product");
  }
});

app.get("/products", async (req, res) => {
  try {
    const result = await pool.query(
      // `SELECT p.id_product, p.name, p.price, d.short_description, pi.location, pi.file_name
      //  FROM Products p
      //  JOIN Descriptions d ON p.id_product = d.id_description
      //  JOIN Pictures pi ON p.id_product = pi.id_product`
      `SELECT * FROM Products`
    );
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Server error");
  }
});

app.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT p.id_product, p.name, p.price, d.medium_description, d.long_description, pi.location, pi.file_name
       FROM Products p
       JOIN Descriptions d ON p.id_product = d.id_description
       JOIN Pictures pi ON p.id_product = pi.id_product
       WHERE p.id_product = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Product not found");
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).send("Server error");
  }
});

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send("Forbidden");
    }

    req.user = user;
    next();
  });
};

app.get("/product/:id/pictures", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT pi.location, pi.file_name
       FROM Pictures pi
       WHERE pi.id_product = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Picture not found");
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching picture:", err);
    res.status(500).send("Server error");
  }
});

// eslint-disable-next-line no-unused-vars
// Add a new route to check if the user is authenticated
app.get("/isAuth", isAuthenticated, (req, res) => {
  // If execution reaches here, it means the user is authenticated
  res.status(200).json({ isAuthenticated: true });
});

app.post("/login", async (req, res) => {
  const { login, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM Accounts WHERE login = $1", [login]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).send("Invalid login or password");
    }

    if (user.login == "admin" && user.password == "admin") {
      const token = jwt.sign({ id: user.id_account, login: user.login }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("token", token, { httpOnly: true, secure: false });
      return res.status(200).send({ login: user.login });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send("Invalid login or password");
    }

    const customerResult = await pool.query(
      "SELECT active FROM Accounts WHERE id_account = $1",
      [user.id_account]
    );
    const customer = customerResult.rows[0];

    if (!customer || !customer.active) {
      return res.status(403).send("Account is inactive");
    }
    const token = jwt.sign({ id: user.id_account, login: user.login }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, secure: false });
    return res.status(200).send({ login: user.login });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send("Server error");
  }
});

// User logout
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).send("Logged out successfully");
});

// Add a new user
app.post("/add-user", isAuthenticated, async (req, res) => {
  const { login, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await pool.query(
      "INSERT INTO Accounts (login, password, active) VALUES ($1, $2, $3)",
      [login, hashedPassword, true]
    );
    res.status(201).send("User added successfully");
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).send("Error adding user");
  }
});

// Edit user
app.put("/edit-user/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { login, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await pool.query(
      "UPDATE Accounts SET login = $1, password = $2 WHERE id_account = $3",
      [login, hashedPassword, id]
    );
    res.status(200).send("User updated successfully");
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).send("Error updating user");
  }
});

// Deactivate user
app.put("/deactivate-user/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("UPDATE Accounts SET active = FALSE WHERE id_account = $1", [id]);
    res.status(200).send("User deactivated successfully");
  } catch (err) {
    console.error("Error deactivating user:", err);
    res.status(500).send("Error deactivating user");
  }
});

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

  console.log("Cart updated:", req.session.cart);
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
  console.log("Cart updated:", req.session.cart);
  res.status(200).send(req.session.cart);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
