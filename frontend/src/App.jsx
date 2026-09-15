
import './App.css';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import { MyContext } from './MyContext';
import { useState } from 'react';
import {v1 as uuidv1} from "uuid";


function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);//all chats of curr thread
  const [newChat, setNewChat] = useState(true);
  const [latestReply, setLatestReply] = useState(null);
  const [allThreads, setAllThreads] = useState([]); //all threads of the user
  const [currThreadTitle, setCurrThreadTitle] = useState(""); //title of the current thread
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  

  const providerValues = {
    prompt, 
    setPrompt,
    reply, 
    setReply, 
    currThreadId,
    setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    latestReply,
    setLatestReply,
    allThreads, setAllThreads, setCurrThreadId, setPrevChats, setPrompt, setReply, setLatestReply,
    currThreadTitle, setCurrThreadTitle,
    showProfileMenu, setShowProfileMenu,
    darkMode, setDarkMode, sidebarOpen, setSidebarOpen
  }; //passing values

  return (
    <>
    <div className={darkMode ? "app dark" : "app light"}>


      <MyContext.Provider value = {providerValues}>
         <Sidebar></Sidebar>
      <ChatWindow></ChatWindow>
      </MyContext.Provider>
     
    </div>
      
    </>
  )
}

export default App;
