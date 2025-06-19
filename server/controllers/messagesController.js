const messageModel=require("../model/messageModel");

module.exports.addMessage = async (req, res, next) => {
    try {
      const { from, to, message } = req.body;
      const data = await messageModel.create({
        message: { text: message },
        from,
        to,
      });
  
      if (data) return res.json({ msg: "Message added successfully" });
      return res.status(400).json({ msg: "Failed to add message in database" });
    } catch (ex) {
      next(ex);
    }
  };
  

  module.exports.getAllMessage = async (req, res, next) => {
    try {
      const { from, to } = req.body;
  
      const messages = await messageModel.find({
        $or: [
          { from, to },
          { from: to, to: from },
        ],
      }).sort({ createdAt: 1 });
  
      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.from.toString() === from,
          message: msg.message.text,
        };
      });
  
      res.json(projectedMessages);
    } catch (ex) {
      next(ex);
    }
  };
  