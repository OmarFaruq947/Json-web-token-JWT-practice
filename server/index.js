const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());

const verifyJWT = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders) {
    return res.status(401).send({ message: "unauthorized" });
  }
  const token = authHeaders.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({
        message:
          "forbidden vai forbidden apni basay jan apni right person na... dua cay maf cay...👏",
      });
    }
    req.decoded = decoded;
    next();
  });
};

//login
app.post("/login", (req, res) => {
  const user = req.body;

  //danger do not check password hear for serius application
  // use proper process for hashing and checking
  // after completing all authentication related vilification, issue jwt token
  if (user.email === "user@gmail.com" && user.password === "123") {
    // create token
    const accessToken = jwt.sign(
      { email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.send({
      success: true,
      accessToken: accessToken,
    });
  } else {
    res.send({ success: false });
  }
});

app.get("/orders", verifyJWT, (req, res) => {
  res.send([
    { id: 1, item: "sunglus" },
    { id: 2, item: "munglus" },
    { id: 3, item: "tunglus" },
  ]);
});

app.listen(port, () => {
  console.log("listening to port", port);
});

/**
 * note:
 *
 * 1) whot create a secret token ?
 * answer:  require('crypto').randomBytes(64).toString('hex')
 */
