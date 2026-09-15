import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from './MyContext';
import { v1 as uuidv1 } from "uuid";
import logo from "./assets/blacklogo.png";

export default function Sidebar(){
const { 
    allThreads, 
    setAllThreads, 
    currThreadId, 
    setCurrThreadId, 
    setPrevChats, 
    setPrompt, 
    setReply, 
    setLatestReply, 
    setNewChat,
    showProfileMenu,
    setShowProfileMenu,
    darkMode,
    setDarkMode,
    sidebarOpen,
    setSidebarOpen
} = useContext(MyContext);



const getAllThreads = async () => {
    try {
        const response = await fetch("https://buddygpt-backend.onrender.com/api/thread");
         const res = await response.json();
         const filteredThreads = res.filter(thread => thread.threadId && thread.title);
        //threadid, title

         setAllThreads(filteredThreads);
    } catch (error) {
        console.error("Error fetching threads:", error);
    }
};

useEffect(() => {
    getAllThreads();
}, [currThreadId]); // Fetch threads whenever the current thread ID changes

const handleNewChat = () => {
   setNewChat(true);
   setPrompt("");
   setReply("");
   setPrevChats([]);
   setLatestReply(null);
   setCurrThreadId(uuidv1()); // Generate a new thread ID for the new chat
    // Logic to create a new chat thread
    // You can generate a new threadId and set it in the context
};

//chnage thread
const handleThreadClick = async (newThreadId) => {
    setCurrThreadId(newThreadId);
    setNewChat(false);
      // Fetch the chats for the selected thread from the backend

      try {
         const response = await fetch(`https://buddygpt-backend.onrender.com/api/thread/${newThreadId}`);
         const messages = await response.json();
         console.log("Fetched messages for thread:", messages);
         const chats = [];
         for (let i = 0; i < messages.length; i += 2) {
            const prompt = messages[i]?.content || "";
            const reply = messages[i + 1]?.content || "";
            chats.push({ prompt, reply });
         }




         setPrevChats(chats);
         setPrompt("");
         setReply("");
         setLatestReply(null);
      } catch (error) {
         console.error("Error fetching chats for thread:", error);
      }
}

const handleDeleteThread = async (threadId) => {
    try {
        const response = await fetch(
            `https://buddygpt-backend.onrender.com/api/thread/${threadId}`, 
            {
            method: "DELETE",
            });
            
            const res = await response.json();
        if (response.ok) {
            console.log("Thread deleted successfully");
        }
      //update the allThreads state after deletion
      setAllThreads((prevThreads) => 
        prevThreads.filter(thread => 
            thread.threadId !== threadId));

            if (currThreadId === threadId) {
                setCurrThreadId(null);
                setPrevChats([]);
                setPrompt("");
                setReply("");
                setLatestReply(null);
            }



    } catch (error) {
        console.error("Error deleting thread:", error);
    }
   }



    return (
        
            <section className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
            <div className="sidebarHeader">
                <img
                  src={logo}
                  alt="BuddyGPT"
                  className="logo"
            />

            <button
            className="sidebarToggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            >
            <i
                className={
                    sidebarOpen
                        ? "fa-solid fa-chevron-left"
                        : "fa-solid fa-chevron-right"
                }
            ></i>
            </button>
            </div>

             <button className="newChatButton" onClick={handleNewChat}>
                {/* <img src="src/assets/blacklogo.png" alt="gpt logo" className="logo"></img> */}
                <i className="fa-solid fa-pen-to-square"></i>
                <span>New Chat</span>
             </button>


             

                <ul className="history">
           {
            allThreads?.map((thread, index) => {
                 return (
                  <li
                   key={thread.threadId}
                   className={`historyItem ${thread.threadId === currThreadId ? 'active' : ''}`}
                   onClick={() => handleThreadClick(thread.threadId)}
                   >
          
            
                   <span className="threadTitle">
                    {thread.title}
                   </span>

                <span
                className="deleteIcon"
                onClick={(e) => {
                  e.stopPropagation();
                handleDeleteThread(thread.threadId);
                }}
                >
                <i className="fa-solid fa-trash"></i>
                </span>
         </li>
      );
    })
  }
</ul>

 <div className="profileSection">

    <button
        className="profileButton"
        onClick={() => setShowProfileMenu(!showProfileMenu)}
    >
        <div className="profileAvatar">
            P
        </div>

        <span className="profileName">
            Punam
        </span>

        <i className="fa-solid fa-ellipsis"></i>
    </button>

    {showProfileMenu && (
        <div className="profileMenu">

            <button>
                <i className="fa-solid fa-user"></i>
                <span>Profile</span>
            </button>

            <button>
                <i className="fa-solid fa-arrow-up"></i>
                <span>Upgrade</span>
            </button>

            <button>
                <i className="fa-solid fa-gear"></i>
                <span>Settings</span>
            </button>

            <button onClick={() => setDarkMode(!darkMode)}>
                <i className="fa-solid fa-circle-half-stroke"></i>
                <span>{darkMode ? "Light mode" : "Dark mode"}</span>
            </button>

            <hr />

            <button>
                <i className="fa-solid fa-right-from-bracket"></i>
                <span>Logout</span>
            </button>

        </div>
    )}

</div>
             
        </section>
    );
}