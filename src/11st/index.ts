const express = require("express");
const router = express.Router();

async function test() {
    global.console.log("aaa");
}

export default router;