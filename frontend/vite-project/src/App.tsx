import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ChatPage from "./pages/Chat";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:chatId" element={<ChatPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
