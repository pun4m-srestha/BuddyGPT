import express from "express";
import getOpenAIAPIResponse from "../utils/openai.js";

import mongoose from "mongoose";
import Thread from "../models/thread.js";
const router = express.Router();

const connectDB = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB connected");

    } catch(err) {

        console.log("MongoDB connection error:", err);

        process.exit(1);

    }

};

//get all threads
router.get("/thread",async(req, res) => {
    try{
        const threads = await Thread.find({}).sort({updatedAt: -1});
        //desc order of ipdatedAt.. most recent data on top
        res.json(threads);
        } catch(err) {
        console.log(err);
        res.status(500).json({error: "failed to fetch threads"});
    }

});

router.get("/thread/:threadId", async(req, res) => {
    const {threadId} = req.params;
    try {
      const thread = await Thread.findOne({threadId});

      if(!thread) {
        return res.status(404).json({
            error: "thread is not found"});
      }
      res.json(thread.messages);
    }
     catch(err) {
        console.log(err);
        res.status(500).json({
            error: "failed to fetch threads"});
}
});


router.delete("/thread/:threadId", async(req, res) => {
    const {threadId} = req.params;
    try {
      const deletedThread = await Thread.findOneAndDelete({threadId});

      if(!deletedThread){
        res.status(404).json({error: "thread not found"});
      }
      res.status(200).json({success : "Thread deleted successfully"});
      
    }
     catch(err) {
        console.log(err);
        res.status(500).json({error: "failed to fetch threads"});
}
});

router.post("/chat", async(req,res) => {
    const {threadId, message} = req.body;

    if(!threadId || !message) {
        return res.status(400).json({error: "missing required fields"});
    }

    try {
        let thread = await Thread.findOne({threadId});

        if(!thread) {
            thread = new Thread({
                threadId,
                title: message,
                messages: [{role: "user", content: message}]
            });
        }
        else {
            thread.messages.push({role: "user", content: message});
        }

        const assistantReply =  await getOpenAIAPIResponse(thread.messages);
    

    

    thread.messages.push({role: "assistant", content: assistantReply});
    thread.updatedAt = new Date();

    await thread.save();
    res.json({reply: assistantReply});
    } catch(err) {
        console.log(err);
        res.status(500).json({error: "something went wrong"});
    }

});

export default router;