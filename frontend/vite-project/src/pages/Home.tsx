import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [value, setValue] = useState("");
  const nav = useNavigate()
  const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;

  async function callbackend(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("calling backend api")
    if (!VITE_BACKEND_API) return;
    const result = await axios.post(`${VITE_BACKEND_API}/api/v1/chat/newChat`, {
      prompt: value,
      modelUsed: "openrouter/free"
    });
    if (result.data.status === "-") return;
    console.log(result.data);
    nav(`/${result.data.chatId}`);
  }

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <form onSubmit={callbackend}>
          <Input
            placeholder="enter your prompt..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-150 h-20 text-white"
          />
          <button type="submit" className="text-white">Submit</button>
        </form>
      </div>
    </>
  );
}
