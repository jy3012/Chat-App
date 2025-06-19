import React from 'react';
import styled from 'styled-components';
import Robot from "../assests/robot.gif";

const Welcome = ({ currentUser }) => {
  // Check if currentUser is defined and has a username
  if (!currentUser || !currentUser.username) {
    return <Container><h1>Loading...</h1></Container>; // Or any other fallback if currentUser is not available
  }

  return (
    <Container>
      <img src={Robot} alt="robot" />
      <h1>
        Welcome, <span>{currentUser.username}!</span>
      </h1>
      <h3>Please select a chat to Start Messaging</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  
  img {
    height: 20rem;
  }

  span {
    color: #4e00ff; /* Added missing colon here */
  }
`;

export default Welcome;
