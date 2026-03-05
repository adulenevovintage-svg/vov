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
  // Based on technical documentation for Telebirr H5 integration
  app.post("/api/payments/telebirr/initialize", async (req, res) => {
    try {
      const { amount, tx_ref, return_url } = req.body;
      const appId = process.env.TELEBIRR_APP_ID;
      const appKey = process.env.TELEBIRR_APP_KEY;
      const publicKey = process.env.TELEBIRR_PUBLIC_KEY;

      if (!appId || !appKey) {
        return res.status(400).json({ 
          error: "Telebirr configuration is missing. Please provide TELEBIRR_APP_ID and TELEBIRR_APP_KEY." 
        });
      }

      // These are the specific parameters identified from your research
      const paymentData = {
        appId: appId,
        appKey: appKey, // Used for signing
        nonce: crypto.randomBytes(16).toString('hex'),
        notifyUrl: `${process.env.APP_URL || 'http://localhost:3000'}/api/payments/telebirr/callback`,
        outTradeNo: tx_ref,
        totalAmount: amount.toString(),
        subject: "Novyra Service Payment",
        returnUrl: return_url,
        timeoutExpress: "30",
        timestamp: Date.now().toString(),
      };

      // Note: In a production environment with real keys, 
      // you would use RSA encryption with the publicKey here.
      
      res.json({
        success: true,
        message: "Telebirr initialization prepared",
        data: paymentData,
        // This would be the actual Telebirr H5 payment gateway URL
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
