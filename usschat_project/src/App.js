import socketIO from "socket.io-client";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Join from "./component/Join/Join";
import Chat from "./component/chat/chat";
const ENDPOINT = 'http://localhost:3605/';
const socket = socketIO(ENDPOINT, { transports: ['websocket'] });

function App() {
  socket.on("connect", () => {

  })

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Join />} />
          <Route exact path="/chat" Component={Chat} /> {/* Render Join component when path is '/' */}
          {/* Use the chat component within a Route */}
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
