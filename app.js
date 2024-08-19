import express from "express";
import { isvalidDate } from "./util/isValidDate.js";
const app = express();

app.use("/api/:date?", (req, res) => {
  const date = new Date(req.params.date);
  if (req.params.date === undefined) {
    return res.json({
      unix: new Date().getTime(),
      utc: new Date().getTime()
    });
  } else if (isvalidDate(req.params.date)) {
    return res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  } else if (typeof +req.params.date === "number") {
    const month = date.getMonth() + 1;
    const day = date.getDate() + 1;

    const year = date.getFullYear();
    const date_str = `${year}-${month}-${day}`;

    return res.json({
      unix: +req.params.date,
      utc: new Date(date_str).toUTCString()
    });
  } else {
    return res.json({ error: "Invalid Date" });
  }
});

app.use("/", (req, res) => {
  res.send("Timestamp Microservices");
});

app.listen(3000, () =>
  console.log("Server is running on http://localhost:3000")
);
