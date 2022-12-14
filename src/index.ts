const express = require("express");
const cors = require("cors");

import st11 from "./11st";

const PORT = 3001;

const app = express();

app.set("port", PORT);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
});

app.use(cors());

app.use("/11st", st11);