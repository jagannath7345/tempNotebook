const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json([notes]);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a Valid Title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await notes.save();
      res.json(savedNote);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
);

router.put("/updatenotes/:id",fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    const newNotes = {};
    if(title){newNotes.title = title};
    if(description){newNotes.description = description};
    if(tag){newNotes.tag = tag};

let notes = await Notes.findById(req.params.id);
if(!notes){return res.status(404).send("Not Found")}

if(notes.user.toString() !==req.user.id){
    return res.status(401).send("Not Found")
}

notes = await Notes.findByIdAndUpdate(req.params.id, {$set: newNotes}, {new: true})
res.json({notes});

})

router.delete("/deletenotes/:id",fetchuser, async (req, res) => {
  const {title, description, tag} = req.body;
 
let notes = await Notes.findById(req.params.id);
if(!notes){return res.status(404).send("Not Found")}

if(notes.user.toString() !==req.user.id){
  return res.status(401).send("Not Allowed")
}

notes = await Notes.findByIdAndDelete(req.params.id)
res.json({"success": "Note has been deleted",notes: notes});

})

module.exports = router;
