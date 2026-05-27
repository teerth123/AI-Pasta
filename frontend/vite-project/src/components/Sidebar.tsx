import { useState, useEffect } from "react"
import axios from "axios"
import { PanelRightClose } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface ChatHistoryItem{
    chatName:string,
    id:string
}

const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API

export default function Sidebar(){
    const [isOpen, setIsOpen] = useState(true)
    const navigate = useNavigate()
    const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([])

    useEffect(()=>{
        async function fetchData() {
            if(!VITE_BACKEND_API) return
            console.log("Fetching chat history...")
            const res = await axios.get(`${VITE_BACKEND_API}/api/v1/history/allChats`)
            setChatHistory(res.data.data)
            console.log(res.data)
        }
        fetchData()
    }, [])
    return(
        <>
            <div className={`h-screen flex flex-col ${isOpen ? 'w-60' : 'w-20'} bg-[#242424] text-white border-r border-gray-300`}>
                <div className="flex justify-between items-center p-4">
                    <h1 className="font-semibold text-xl my-5">History</h1>
                    {isOpen && (
                        <button onClick={() => setIsOpen(false)}>
                            <PanelRightClose />
                        </button>
                    )}
                </div>
                {chatHistory.length > 0 ? (
                        chatHistory.map((msg, index) => (
                            <div key={index} className="border-b border-gray-300 " onClick={()=>navigate(`/${Number(msg.id)}`)} >
                                {msg.chatName}
                            </div>
                        ))
                    ) : (
                        <div className="text-black">No chat history available</div>
                    )}  
            </div>
        </>
    )
}
