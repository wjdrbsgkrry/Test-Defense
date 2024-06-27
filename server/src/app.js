import express from "express";
import dotenv from "dotenv";

require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send(`${PORT} 번 서버에 접속하였습니다!`);
});

app.listen((req, res) => {
  console.log(`${PORT} 번 서버에 접속하였습니다!`);
});
