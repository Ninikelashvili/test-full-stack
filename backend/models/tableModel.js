const mongoose = require("mongoose");

const ColumnSchema = new mongoose.Schema({
  name: { type: String, required: true },
  datatype: { type: String, required: true },
  nullable: { type: Boolean, default: false },
});

const TableSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  columns: [ColumnSchema],
});

module.exports = mongoose.model("Table", TableSchema);
