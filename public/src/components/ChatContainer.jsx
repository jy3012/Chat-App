import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import Logout from './Logout';
import ChatInput from './ChatInput';
import axios from 'axios';
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoute';
import { v4 as uuidv4 } from "uuid";

const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const [Messages, setMessages] = useState([]);
  const [arrivalMessages, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!currentUser?._id || !currentChat?._id) return;

        const response = await axios.post(getAllMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
  
        const processedMessages = response.data.map(msg => ({
          fromSelf: msg.fromSelf,
          message: msg.message,
          _id: uuidv4()
        }));
  
        setMessages(processedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
  
    if (currentChat) {
      fetchMessages();
    }
    
    return () => {
      // Cleanup function to reset messages when unmounting
      setMessages([]);
    };
  }, [currentChat, currentUser]);
  
  useEffect(() => {
    if (arrivalMessages) {
      setMessages((prevMessages) => [...prevMessages, {
        ...arrivalMessages,
        _id: uuidv4()
      }]);
    }
  }, [arrivalMessages]);

  const handleSendMsg = async (msg) => {
    try {
      await axios.post(sendMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      });

      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: currentUser._id,
        message: msg,
      });

      const newMessage = { 
        fromSelf: true, 
        message: msg,
        _id: uuidv4()
      };
      setMessages(prev => [...prev, newMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    const socketRef = socket.current;
  
    if (socketRef) {
      socketRef.on("msg-recieve", (msg) => {
        setArrivalMessage({ 
          fromSelf: false, 
          message: msg,
          _id: uuidv4()
        });
      });
    }
  
    return () => {
      if (socketRef) {
        socketRef.off("msg-recieve");
      }
    };
  }, [socket]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [Messages]);

  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img src={currentChat.avatarImage} alt="avatar" />
              </div>
              <div className="username">
                <h3>{currentChat.username || 'Guest'}</h3>
              </div>
            </div>
            <Logout />
          </div>

          <div className="chat-messages">
            {Messages.map((message) => (
              <div 
                className={`message-container ${message.fromSelf ? "sender" : "receiver"}`}
                key={message._id}
                ref={scrollRef}
              >
                <div className="message-content">
                  <p>{message.message}</p>
                </div>
              </div>
            ))}
          </div>

          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  overflow: hidden;
  gap: 0.1rem;
  color: white;

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;

      .avatar {
        img {
          height: 3rem;
          border-radius: 50%;
        }
      }

      .username {
        h3 {
          color: white;
        }
      }
    }
  }

  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 0.3rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 1rem;
    }

    .message-container {
      display: flex;
      width: 100%;
      margin-bottom: 1rem;
      
      .message-content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        
        p {
          margin: 0;
        }
      }
    }

    .sender {
      justify-content: flex-end;
      
      .message-content {
        background-color: #4f04ff91;
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 0;
      }
    }

    .receiver {
      justify-content: flex-start;
      
      .message-content {
        background-color: #9900ff55;
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 0;
      }
    }
  }
`;

export default ChatContainer;
