import React, { useState } from 'react'
import styled from 'styled-components'
import Picker from "emoji-picker-react"
import { IoMdSend } from "react-icons/io"
import { BsEmojiSmileFill } from "react-icons/bs"

const ChatInput = ({ handleSendMsg }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (emojiObject) => {
        let message = msg;
        message += emojiObject.emoji;
        setMsg(message);
    }

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg('');
        }
    }

    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                    {
                        showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />
                    }
                </div>
            </div>
            <form className='input-container' onSubmit={sendChat}>
                <input
                    type="text"
                    placeholder='type your message here'
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                />
                <button className='submit' type="submit">
                    <IoMdSend />
                </button>
            </form>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  background-color: #1e1e2f;
  border-top: 1px solid #333;
  position: relative;

  .button-container {
    display: flex;
    align-items: center;
    margin-right: 1rem;

    .emoji {
      position: relative;

      svg {
        font-size: 1.8rem;
        color: #f1c40f;
        cursor: pointer;
        transition: transform 0.2s ease;

        &:hover {
          transform: scale(1.2);
        }
      }

      .emoji-picker-react {
        position: absolute;
        bottom: 3rem;
        left: 0;
        background-color: #2c2c3e !important;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
        border: 1px solid #555 !important;
        border-radius: 0.5rem;
        z-index: 10;

        .emoji-search {
          background-color: #3a3a4d !important;
          color: white;
        }

        .emoji-group:before {
          background-color: #2c2c3e !important;
        }

        .emoji-categories button {
          filter: grayscale(1);
        }
      }
    }
  }

  .input-container {
    flex: 1;
    display: flex;
    align-items: center;
    background-color: #2f2f3f;
    border-radius: 2rem;
    padding: 0.6rem 1rem;

    input {
      flex: 1;
      background-color: transparent;
      border: none;
      color: white;
      font-size: 1.1rem;
      padding-left: 0.5rem;

      &::placeholder {
        color: #bbb;
      }

      &:focus {
        outline: none;
      }
    }

    button {
      background: none;
      border: none;
      outline: none;
      cursor: pointer;
      padding: 0.3rem;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        font-size: 1.5rem;
        color: #4f04ff;
        transition: color 0.3s ease;

        &:hover {
          color: #fff;
        }
      }
    }
  }
`;

export default ChatInput;
