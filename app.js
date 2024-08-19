import express from "express";
import { isvalidDate } from "./util/isValidDate";
const app = express();

app.use("/api/:date?", (req, res) => {
  if (req.params.date === undefined) {
    return res.json({
      unix: Date.now(),
      utc: Date.now()
    });
  } else if (isvalidDate(req.params.date)) {
    return res.json({
      unix: new Date(req.params.date).getTime(),
      utc: new Date(req.params.date).toUTCString()
    });
  } else if (typeof +req.params.date === "number") {
    console.log(req.params.date);
    const date = new Date(+req.params.date);

    const month = date.getMonth() + 1;
    const day = date.getDate() + 1;

    const year = date.getFullYear();
    const date_str = `${year}-${month}-${day}`;
    console.log(date_str);
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
