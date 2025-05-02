const fs = require("fs").promises;
const path = require("path");
const dataFile = path.join(__dirname, "../data/contentData.json");

//Helper to read data

const readData = async () => {
  const data = await fs.readFile(dataFile, "utf-8");
  return JSON.parse(data);
};

//Helper to write data
const writeData = async (data) => {
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2), "utf-8");
};

//GET all content
const getAllContent = async (req, res) => {
  try {
    const content = await readData();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: "Error reading content data" });
  }
};

//GET one by ID
const getContentById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const content = await readData();
    const item = content.find((c) => c.id === id);
    if (!item) return res.status(404).json({ message: "Content not found" });
    res.json(item);
  } catch {
    res.status(500).json({ message: "Error retrieving content" });
  }
};

//POST new content
const createContent = async (req, res) => {
  try {
    const { section, title, description } = req.body;
    if (!section || !title || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const content = await readData();
    const newItem = {
      id: Date.now(),
      section,
      title,
      description,
    };
    content.push(newItem);
    await writeData(content);
    res.status(201).json(newItem);
  } catch {
    res.status(500).json({ message: "Error creating content" });
  }
};

//PUT update by ID
const updateContent = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { section, title, description } = req.body;
    const content = await readData();
    const index = content.findIndex((c) => c.id === id);
    if (index === -1)
      return res.status(404).json({ message: "Content not found" });

    content[index] = { id, section, title, description };
    await writeData(content);
    res.json(content[index]);
  } catch {
    res.status(500).json({ message: "Error updating content" });
  }
};

//Delete by ID
const deleteContent = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log("trying to delete the id: ", id);
    const content = await readData();
    const newData = content.filter((c) => c.id !== id);
    if (newData.length === content.length) {
      return res.status(404).json({ message: "Content not found" });
    }
    await writeData(newData);
    res.json({ message: "Content deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting content" });
  }
};

module.exports = {
  getAllContent,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
};
