const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 4000;
const apiKey = "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";

app.use(cors());
app.use(express.json());

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${apiKey}`,
};

app.post("/sendData", (req, res) => {
  const { message } = req.body;
  const data = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: `${message}` }],
  };
  axios
    .post("https://api.openai.com/v1/chat/completions", data, { headers })
    .then((response) => {
      console.log(response.data);
      res.send("Data sent successfully!");
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send("An error occurred.");
    });
});

app.get("/getData", (req, res) => {
  const data = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Bonjour comment tu vas?" }],
  };
  axios
    .post("https://api.openai.com/v1/chat/completions", data, { headers })
    .then((response) => {
      const resp = response.data;
      console.log(resp);
      res.send("Connection with the API successful!");
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send("An error occurred.");
    });
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
