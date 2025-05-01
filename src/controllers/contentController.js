const data = require("../data/contentData.json");

exports.getContent = (req, res) => {
  res.json(data);
};

exports.updateContent = (req, res) => {
  //In a real world app this would write to a DB.
  //Here, we'll just echo back the updated content.
  const updated = req.body;

  res.status(200).json({
    message: "content updated (mock)",
    content: updated,
  });
};
