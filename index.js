const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const port = 3000;
const requestIp = require("request-ip");
const useragent = require("express-useragent");

// Sử dụng middleware express-useragent để trích xuất thông tin User-Agent
app.use(useragent.express());

app.get("*", (req, res) => {
  try {
    const clientIp = requestIp.getClientIp(req);
    const query = req.query;

    // Lấy thông tin User-Agent từ middleware express-useragent
    const userAgent = req.useragent;

    // Kiểm tra xem có tham số truy vấn và "fbclid" không hiện diện
    // và người dùng đang sử dụng điện thoại hoặc máy tính bảng
    if (
      query &&
      Object.keys(query).length > 0 &&
      !Object.keys(query).includes("fbclid") &&
      (userAgent.isMobile || userAgent.isTablet)
    ) {
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
