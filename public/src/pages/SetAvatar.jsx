import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../assests/loader.gif";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoute";
import "react-toastify/dist/ReactToastify.css";

// Import local avatar images
const allAvatars = [
  "/Multiavatar-Angela Flagg.png",
  "/Multiavatar-Big Brother.png",
  "/Multiavatar-Bruno Fox.png",
  "/Multiavatar-Bugzilla.png",
  "/Multiavatar-Dogecoin.png",
  "/Multiavatar-Hiro.png",
  "/Multiavatar-Joachim Molesworth.png",
  "/Multiavatar-Joker.png",
  "/Multiavatar-Major Salt.png",
  "/Multiavatar-Orbital.png",
  "/Multiavatar-Particle Machine.png",
  "/Multiavatar-SnakeHarrison.png",
];

const SetAvatar = () => {
  const navigate = useNavigate();
  const [displayAvatars, setDisplayAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const checkUser = async () => {
      const userData = localStorage.getItem("chat-app-user");
      if (!userData) {
        navigate("/login");
        return;
      }
      try {
        const user = JSON.parse(userData);
        if (!user || !user._id) {
          localStorage.removeItem("chat-app-user");
          navigate("/login");
          return;
        }
        if (user.isAvatarImageSet) {
          navigate("/");
          return;
        }
      } catch (error) {
        console.error("Invalid user data:", error);
        localStorage.removeItem("chat-app-user");
        navigate("/login");
        return;
      }
    };

    checkUser();
    const shuffled = allAvatars.slice().sort(() => 0.5 - Math.random()).slice(0, 4);
    setTimeout(() => {
      setDisplayAvatars(shuffled);
      setIsLoading(false);
    }, 1000);
  }, [navigate]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar first", toastOptions);
      return;
    }

    try {
      const userData = localStorage.getItem("chat-app-user");
      if (!userData) {
        toast.error("User session expired. Please login again.", toastOptions);
        navigate("/login");
        return;
      }

      const user = JSON.parse(userData);
      if (!user || !user._id) {
        toast.error("Invalid user data. Please login again.", toastOptions);
        navigate("/login");
        return;
      }

      const selectedImage = displayAvatars[selectedAvatar];
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: selectedImage
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        toast.success("Avatar set successfully!", toastOptions);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.error(data.msg || "Error setting avatar. Please try again.", toastOptions);
      }
    } catch (error) {
      console.error("Error setting avatar:", error);
      if (error.response?.data?.msg) {
        toast.error(error.response.data.msg, toastOptions);
      } else {
        toast.error("Failed to set avatar. Please try again.", toastOptions);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {displayAvatars.map((avatar, index) => (
              <div
                key={index}
                className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
                onClick={() => setSelectedAvatar(index)}
              >
                <img src={avatar} alt={`avatar-${index}`} />
              </div>
            ))}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Set as Profile Picture
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.3s ease-in-out;
      cursor: pointer;

      img {
        height: 6rem;
        transition: 0.3s ease-in-out;
      }

      &:hover {
        border: 0.4rem solid #4e0eff;
      }
    }

    .selected {
      border: 0.4rem solid #4e0eff;
      box-shadow: 0px 0px 10px rgba(78, 14, 255, 0.5);
      transform: scale(1.1);
    }
  }

  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: #997af0;
    }
  }
`;

export default SetAvatar;
