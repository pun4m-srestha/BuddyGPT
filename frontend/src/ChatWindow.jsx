import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from './MyContext';
import { useContext, useState, useEffect } from "react";

import { SyncLoader } from "react-spinners";



export default function ChatWindow(){
    
    const { prompt, setPrompt, reply, setReply, currThreadId, setCurrThreadId, prevChats, setPrevChats, newChat, setNewChat }  = useContext(MyContext);
    const [ loading, setLoading ] = useState(false);
    
    //const [isOpen, setIsOpen] = useState(false);

    

    const getReply = async () => {
        if (!prompt.trim()) return;

        setLoading(true);

        console.log("message:",prompt, "threadId:", currThreadId);

        const currentPrompt = prompt;

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: currentPrompt,
                threadId: currThreadId,
            })
        };
        try {
            const response = await fetch(
                "http://localhost:3000/api/chat", 
                options
            );
            const res = await response.json();
            console.log("API response:", res);
            setReply(res.reply);

            setPrevChats(prev => [
            ...prev,
            {
                prompt: currentPrompt,
                reply: res.reply
            }
        ]);
                setPrompt("");
                setNewChat(false);

        } catch(err){
            console.log("API error:",err);
        }
        setLoading(false);
    };

    //append new chat to prevChats

    useEffect(()=>{
        if(prompt && reply){
            setPrevChats([...prevChats, {prompt, reply}]);
            setPrompt("");
        }
    }, [reply]);

    return(
        <div className="chatWindow">
        
            <div className="navbar"><span>BuddyGPT<i className="fa-solid fa-angle-down"></i></span>
                
            </div>

           

           <div className={`mainContent ${newChat ? "newChat" : ""}`}>
           <Chat />

            <div className="loader">
                <SyncLoader color="#fff" loading={loading} />
            </div>


            <div className="chatInput">
                {!newChat && (
                <p className="info">BuddyGPT can make mistakes. Check important info.</p>
                )}
                <div className="inputBox">
                    <input placeholder="Ask anything" 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            getReply();
                         }
                        }}
                    />
                    
                    <div id="submit" onClick={getReply}>
                        <i className="fa-solid fa-paper-plane"></i>
                    </div>
                </div>
                
                
            </div>
            </div>
        </div>
    );
}