const express = require("express");
const {
  createTable,
  getTables,
  getTableData,
} = require("../contorllers/tableController");

const router = express.Router();

router.post("/create", createTable);
router.get("/", getTables);
router.get("/:name", getTableData);

module.exports = router;
