const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ TELEGRAM CONFIG
const TOKEN = "8610374232:AAEYNX35yZhCyCR2GWyK79TjMwxTQOfRE_4";   
const CHAT_ID = "8672094096";     // 👉 तुम्हारा chat id

// ✅ SEND NOTIFICATION FUNCTION
const sendNotification = async (email) => {
  try {
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: `🚨 Login Alert!\nEmail: ${email}\nTime: ${new Date()}`
    });
  } catch (err) {
    console.log("Telegram Error:", err.message);
  }
};

// ✅ LOGIN API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email === "admin@gmail.com" && password === "1234") {
    await sendNotification(email);
    return res.json({
      ok: true,
      user: { firstName: "Admin" }
    });

  } else {
    return res.json({
      ok: false,
      error: "Invalid credentials"
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});