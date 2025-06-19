import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import {BiPowerOff} from 'react-icons/bi'

export default function Logout() {
    const navigate=useNavigate();
    const handleClick=()=>{
        localStorage.removeItem("chat-app-user");
        navigate("/login");
    }

  return (
    <Button onClick={handleClick}>
        <BiPowerOff/>
    </Button>
  )
}

const Button=styled.button`
display:flex;
justify-content:center;
align-items:center;
padding:0.5rem;
border-radius:0.5rem;
background-color:#9a86f3;
border:none;
cursor:pointer;
transition:0.3s ease-in-out;
svg{
font-size:1.3rem;
color:#ebe7ff;
}
&:hover{
    background-color:#4e0eff;
}
`;