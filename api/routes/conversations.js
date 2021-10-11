const router = require("express").Router();
const Conversation = require("../models/Conversation");

// new conversation
router.post("/", async (req, res) => {
  const conv = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConv = await conv.save();
    res.status(200).json(savedConv);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a conv of a user
router.get("/:userId", async (req, res) => {
  try {
    const conv = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conv);
  } catch (error) {
    res.status(500).json(error);
  }
});
// get conv including two userId
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conv = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conv);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
