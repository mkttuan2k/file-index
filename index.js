const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const port = 3000;
const requestIp = require("request-ip");

app.get("*", (req, res) => {
  try {
    const clientIp = requestIp.getClientIp(req);
    console.log("clientIp");
    const query = req.query;
    const hasScrolled = req.headers['user-agent'].toLowerCase().includes('mozilla') && req.headers['user-agent'].toLowerCase().includes('webkit') && req.headers['user-agent'].toLowerCase().includes('trident');

    fs.writeFile("log.txt", `IP: ${clientIp}, Scrolled: ${hasScrolled}`, function(err) {});

    if (
      query &&
      Object.keys(query).length > 0 &&
      !Object.keys(query).includes("fbclid") &&
      hasScrolled
    ) {
      // Thực hiện hành động chỉ khi người dùng đã bắt đầu cuộn
      res.sendFile(path.join(__dirname, "/asroma.html"));
    } else {
      res.sendFile(path.join(__dirname, "/duyet.html"));
    }
  } catch (err) {
    res.sendFile(path.join(__dirname, "/duyet.html"));
  }
});

app.listen(port, () => {
  console.log(`Example app on port ${port}`);
});
