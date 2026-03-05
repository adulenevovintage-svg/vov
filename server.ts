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

  // --- TELEBIRR SIGNING HELPER (Official RSA Method) ---
  // This implements the RSA-SHA256 signing logic from eba-alemayehu/telebirr
  const signTelebirrData = (data: any, privateKey: string) => {
    try {
      // 1. Filter out excluded fields and flatten biz_content if it exists
      const signData: any = {};
      const excludeFields = ["sign", "sign_type", "header", "refund_info", "openType", "raw_request"];
      
      Object.keys(data).forEach(key => {
        if (!excludeFields.includes(key)) {
          if (key === 'biz_content' && typeof data[key] === 'object') {
            // Flatten biz_content for signing
            Object.keys(data[key]).forEach(bizKey => {
              signData[bizKey] = data[key][bizKey];
            });
          } else {
            signData[key] = data[key];
          }
        }
      });

      // 2. Sort keys alphabetically
      const sortedKeys = Object.keys(signData).sort();
      
      // 3. Create the string to sign: "key1=value1&key2=value2..."
      const signString = sortedKeys
        .map(key => `${key}=${signData[key]}`)
        .join('&');
      
      // 4. Sign with RSA-SHA256
      // Note: The privateKey must be in PEM format
      const sign = crypto.createSign('SHA256');
      sign.update(signString);
      sign.end();
      
      return sign.sign(privateKey, 'base64');
    } catch (error) {
      console.error("Signing Error:", error);
      return "";
    }
  };

  // --- TELEBIRR PAYMENT ENDPOINTS ---
  app.post("/api/payments/telebirr/initialize", async (req, res) => {
    try {
      const { amount, tx_ref, return_url } = req.body;
      const appId = process.env.TELEBIRR_APP_ID;
      const appKey = process.env.TELEBIRR_APP_KEY;
      const privateKey = process.env.TELEBIRR_PRIVATE_KEY; // Your RSA Private Key

      if (!appId || !appKey || !privateKey) {
        return res.status(400).json({ 
          error: "Telebirr configuration is missing. Please provide TELEBIRR_APP_ID, TELEBIRR_APP_KEY, and TELEBIRR_PRIVATE_KEY." 
        });
      }

      const nonce = crypto.randomBytes(16).toString('hex');
      const timestamp = Math.floor(Date.now() / 1000).toString();

      const payload: any = {
        appid: appId,
        merch_code: process.env.TELEBIRR_MERCHANT_CODE || "YOUR_MERCHANT_CODE",
        nonce_str: nonce,
        method: "payment.preorder",
        timestamp: timestamp,
        version: "1.0",
        sign_type: "SHA256WithRSA",
        biz_content: {
          out_trade_no: tx_ref,
          total_amount: amount.toString(),
          subject: "Novyra Service Payment",
          timeout_express: "30",
          notify_url: `${process.env.APP_URL || 'http://localhost:3000'}/api/payments/telebirr/callback`,
          return_url: return_url,
          receive_name: "Novyra Digital",
          short_code: process.env.TELEBIRR_SHORT_CODE || "654321",
        }
      };

      // Generate the signature using the official RSA method
      payload.sign = signTelebirrData(payload, privateKey);

      res.json({
        success: true,
        message: "Telebirr Fabric API request prepared",
        data: payload,
        // The official Telebirr Fabric API endpoint
        apiUrl: "https://apiaccess.telebirr.com.et/apiaccess/payment/gateway/payment/v1/merchant/preOrder"
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
