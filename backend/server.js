import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import getOpenAIAPIResponse from "./utils/openai.js";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import Thread from "./models/thread.js";

dotenv.config();
console.log("MONGODB_URI loaded:", !!process.env.MONGODB_URI);
//console.log(process.env.MONGODB_URI);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api", chatRoutes);


app.post("/test", async (req,res)=>{

try{

const {message} = req.body;


// send conversation to AI

const reply = await getOpenAIAPIResponse([
  {
    role:"system",
    content:"You are a helpful assistant."
  },
  {
    role:"user",
    content:message
  }
]);

const thread = new Thread({
  threadId: new mongoose.Types.ObjectId().toString(),
  messages: [
    {
      role: "user",
      content: message
    },
    {
      role: "assistant",
      content: reply
    }
  ]
});

await thread.save();

console.log("Thread saved to MongoDB");

console.log("User:",message);
console.log("BuddyGPT:",reply);


res.json({
  reply
});


}
catch(err){

console.log(err);

res.status(500).json({
 error:"Internal Server Error"
});

}

});

app.get("/", (req, res) => {
  res.send("BuddyGPT Backend is running!");
});


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`)
  connectDB();
});


const connectDB = async() => {
try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("CONNECTED TO DATABASE");
} catch(err){
  console.log("failed to connect with DB", err);
}
};
export default connectDB;
