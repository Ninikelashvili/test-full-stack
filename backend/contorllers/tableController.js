const Table = require("../models/tableModel");

exports.createTable = async (req, res) => {
  try {
    const { name, columns } = req.body;

    const parsedColumns = JSON.parse(columns);

    const table = new Table({ name, columns: parsedColumns });

    await table.save();
    res.status(201).json({ success: true, message: "Table created", table });
  } catch (error) {
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.name === 1
    ) {
      return res.status(400).json({
        success: false,
        message: "Table with this name already exists.",
      });
    }
    console.error("Error creating table:", error);
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getTables = async (req, res) => {
  try {
    const tables = await Table.find();
    res.status(200).json(tables);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTableData = async (req, res) => {
  try {
    const tableName = req.params.name;
    const table = await Table.findOne({ name: tableName });
    if (!table) {
      return res.status(404).json({ error: "Table not found" });
    }

    res.status(200).json(table);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
