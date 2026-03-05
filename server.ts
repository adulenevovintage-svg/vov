import express from "express";
import { createServer as createViteServer } from "vite";
import axios from "axios";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- CHAPA PAYMENT ENDPOINTS ---
  app.post("/api/payments/chapa/initialize", async (req, res) => {
    try {
      const { amount, email, first_name, last_name, tx_ref, callback_url, return_url } = req.body;
      const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;

      if (!CHAPA_SECRET_KEY) {
        return res.status(500).json({ error: "Chapa Secret Key is missing in environment variables." });
      }

      const response = await axios.post(
        "https://api.chapa.co/v1/transaction/initialize",
        {
          amount,
          currency: "ETB",
          email,
          first_name,
          last_name,
          tx_ref,
          callback_url,
          return_url,
          "customization[title]": "Novyra Digital Payment",
          "customization[description]": "Payment for digital services",
        },
        {
          headers: {
            Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      res.json(response.data);
    } catch (error: any) {
      console.error("Chapa Initialization Error:", error.response?.data || error.message);
      res.status(500).json({ error: error.response?.data || "Failed to initialize Chapa transaction" });
    }
  });

  // --- TELEBIRR PAYMENT ENDPOINTS ---
  // Note: Telebirr requires a more complex signing process. 
  // This is a simplified implementation of the flow.
  app.post("/api/payments/telebirr/initialize", async (req, res) => {
    try {
      const { amount, tx_ref, return_url } = req.body;
      const TELEBIRR_APP_ID = process.env.TELEBIRR_APP_ID;
      const TELEBIRR_APP_KEY = process.env.TELEBIRR_APP_KEY;
      const TELEBIRR_PUBLIC_KEY = process.env.TELEBIRR_PUBLIC_KEY;

      if (!TELEBIRR_APP_ID || !TELEBIRR_APP_KEY || !TELEBIRR_PUBLIC_KEY) {
        return res.status(500).json({ error: "Telebirr configuration is missing in environment variables." });
      }

      // Simplified Telebirr payload structure
      const payload = {
        appId: TELEBIRR_APP_ID,
        outTradeNo: tx_ref,
        totalAmount: amount.toString(),
        subject: "Novyra Service Payment",
        returnUrl: return_url,
        notifyUrl: `${req.protocol}://${req.get('host')}/api/payments/telebirr/callback`,
        timeoutExpress: "30",
        nonce: crypto.randomBytes(16).toString('hex'),
        timestamp: Date.now().toString(),
      };

      // In a real implementation, you would encrypt this with RSA using TELEBIRR_PUBLIC_KEY
      // and sign it with TELEBIRR_APP_KEY.
      // For now, we'll simulate the response or provide the data for the client to handle.
      
      res.json({
        message: "Telebirr initialization data prepared",
        payload,
        // In reality, you'd return a signed/encrypted string to be sent to Telebirr's H5 page
        redirectUrl: "https://h5.telebirr.com.et/..." 
      });
    } catch (error: any) {
      console.error("Telebirr Initialization Error:", error.message);
      res.status(500).json({ error: "Failed to initialize Telebirr transaction" });
    }
  });

  // --- CALLBACKS ---
  app.post("/api/payments/chapa/callback", (req, res) => {
    console.log("Chapa Callback Received:", req.body);
    // Verify signature and update database
    res.status(200).send("OK");
  });

  app.post("/api/payments/telebirr/callback", (req, res) => {
    console.log("Telebirr Callback Received:", req.body);
    // Verify signature and update database
    res.status(200).send("OK");
  });

  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
