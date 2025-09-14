const Bugs = require("../model/Bug.model.js");

const getBugList = async (req, res) => {
  try {
    const bugList = await Bugs.find({});
    res.status(200).json(bugList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const saveBugList = async (req, res) => {
  try {
    const defect = await Bugs.create(req.body);
    res.status(200).json(defect);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBug = async (req, res) => {
  try {
    const { id } = req.params;
    const bug = await Bugs.findByIdAndUpdate(id, req.body);
    if (!bug) {
      res.status(404).json({ message: "Bug not found!!" });
    } else {
      const updatedBug = await Bugs.findById(id);
      res.status(200).json(updatedBug);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBug = async (req, res) => {
  try {
    const { id } = req.params;
    const bug = await Bugs.findByIdAndDelete(id);
    if (!bug) {
      res.status(404).json({ message: "Bug not found!!" });
    } else {
      res.status(200).json({ message: "Bug deleted successfully !!!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getBugList,
  saveBugList,
  deleteBug,
  updateBug,
};
