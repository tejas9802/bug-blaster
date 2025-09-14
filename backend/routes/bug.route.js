const express = require("express");
const router = express.Router();
const {
  getBugList,
  saveBugList,
  updateBug,
  deleteBug,
} = require("../controllers/bug.controller.js");

router.get("/getBugList", getBugList); //get API to get the bug list

router.post("/saveBugs", saveBugList); // post API to save bugs added

router.put("/update/:id", updateBug); //update API to updated specific bug by ID

router.delete("/delete/:id", deleteBug); //delete API to delete specific bug by ID

module.exports = router;
