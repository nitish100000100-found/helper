const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { OAuth2Client } = require("google-auth-library");

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.post("/auth/google/callback", async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    console.log(payload);

    res.json({
      success: true,
      user: payload,
    });
  } catch (err) {
    console.log(err);

    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});