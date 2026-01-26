import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Feedza server is running....");
});

export default app;
