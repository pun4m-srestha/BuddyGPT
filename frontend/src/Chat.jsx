import "./Chat.css";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import remarkGfm from "remark-gfm";

function Chat(){
    const {newChat, prevChats, reply} = useContext(MyContext);

    return(
        <>
        {newChat && <h1>Where should we begin?</h1>}
        <div className="chats">
            {
            prevChats.map((chat, index)=>{
                return(
                    <div key={index} className="chat">

                       <div className="userDiv">
                            <p className="userMessage">
                              {chat.prompt}
                            </p>
                        </div>
                        <div className="gptDiv">
                           <div className="gptMessage">
                               <ReactMarkdown 
                               rehypePlugins={[rehypeHighlight]} 
                               remarkPlugins={[remarkGfm]}
                >
                                 {chat.reply}
                               </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                    
                );
            })}           
        </div>
        </>
    );
}
       
            
                

         
         
        
    
    
export default Chat;