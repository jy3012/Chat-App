import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUserRoute,host } from '../utils/APIRoute';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client'

const Chat = () => {
  const socket =useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat,setCurrentChat]=useState(undefined);
  const [isLoaded,setIsLoaded]=useState(false);

  // First useEffect: Check if user is logged in
  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem('chat-app-user');
  
      if (!storedUser) {
        navigate('/login');
      } else {
        try {
          const parsedUser = JSON.parse(storedUser);
          setCurrentUser(parsedUser);
          setIsLoaded(true);
        } catch (error) {
          console.error('Invalid JSON in localStorage for chat-app-user:', error);
          localStorage.removeItem('chat-app-user'); // Optionally clear corrupted data
          navigate('/login');
        }
      }
    };
  
    fetchUser();
  }, [navigate]);

  useEffect(()=>{
    if(currentUser){
      socket.current=io(host);
      socket.current.emit("add-user",currentUser._id)
    }
  },[currentUser]);
  

  // Second useEffect: Fetch contacts with avatar and username
  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const { data } = await axios.get(`${allUserRoute}/${currentUser._id}`);
          
          // Ensure contacts contain avatarImage and username
          const formattedContacts = data.map((contact) => ({
            _id: contact._id,
            username: contact.username,
            avatarImage: contact.avatarImage,
          }));

          setContacts(formattedContacts);
        } else {
          navigate('/setAvatar');
        }
      }
    };

    fetchContacts();
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);

  }

  return (
    <Container>
      <div className="container">
        {/* Pass contacts to Contacts component */}
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
        {
          isLoaded && currentChat === undefined ? (
        <Welcome currentUser={currentUser}/>
          ):(
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
          )
}
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
