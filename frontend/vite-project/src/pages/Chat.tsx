import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Message from "@/components/ui/message";

export default function ChatPage() {
  const { chatId } = useParams();
  const [value, setValue] = useState("");
  const vite_backend_api = import.meta.env.VITE_BACKEND_API;
  const [prevMessage, setPrevMessage] = useState(null);

  useEffect(()=>{
    async function callBackend() {
        if(!vite_backend_api) {
            console.error("VITE_BACKEND_API is not defined");
            return;
        }
        console.log(`Fetching chat history for ID: ${chatId}`);
      const call = await axios.get(`${vite_backend_api}/api/v1/history/${chatId}`);
      setPrevMessage(call.data.data);
      console.log(call.data);
    }
    callBackend()
  }, [chatId])

  return (
    <>
      <form action="submit" className="fixed left-1/3 flex z-10 bottom-10 w-150 h-20">
        <Input
          className="w-full h-full"
          placeholder="enter your message..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="text-white">
          Send
        </button>
      </form>
      <div className="w-full h-screen flex justify-center items-center">
        {
            prevMessage && prevMessage.length > 0 ? (
                prevMessage.map((msg: any, index: number) => (
                    <Message key={index} prompt={msg.prompt} output={msg.output} modelUsed={msg.modelUsed} />
                ))
            ):(
                <p className="text-gray-500">No messages yet.</p>
            )
        }
      </div>
    </>
  );
}
