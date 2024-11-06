import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";
export const SocketContext = createContext();
export const useSocketContext = () => {
  return useContext(SocketContext);
};
const SocketContextProvider = ({ children }) => {
  // console.log(children);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();
  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:8000", {
        transports: ["websocket"],
        query: { userId: authUser._id },
      });
      socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
      });
      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => {
        if (socket) socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
