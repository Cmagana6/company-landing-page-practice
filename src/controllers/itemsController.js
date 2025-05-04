const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "../data/items.json");

const readData = () => JSON.parse(fs.readFileSync(dataPath));
const writeData = (data) =>
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

exports.getAll = (req, res) => {
  res.json(readData());
};

exports.create = (req, res) => {
  const items = readData();
  const newItem = { id: Date.now(), ...req.body };
  items.push(newItem);
  writeData(items);
  res.status(201).json(newItem);
};

exports.update = (req, res) => {
  const id = parseInt(req.params.id);
  const items = readData();
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return res.status(404).json({ message: "Item not found" });

  items[index] = { ...items[index], ...req.body };
  writeData(items);
  res.json(items[index]);
};

exports.delete = (req, res) => {
  const id = parseInt(req.params.id);
  let items = readData();
  const originalLength = items.length;
  items = items.filter((item) => item.id != id);
  if (items.length === originalLength)
    return res.status(404).json({ message: "Item not found" });

  writeData(items);
  res.status(204).end();
};

exports.getById = (req, res) => {
  const id = parseInt(req.params.id);
  const items = readData();
  const item = items.find((item) => item.id === id);
  if (!item) {
    return res.satus(404).json({ message: "Item not found" });
  }
  res.json(item);
};
