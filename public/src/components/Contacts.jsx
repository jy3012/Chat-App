import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../assests/logo.svg";

const Contacts = ({ currentUser, changeChat }) => {
    const [contacts, setContacts] = useState([]); // State to store contacts
    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUserImage, setCurrentUserImage] = useState("");
    const [currentSelected, setCurrentSelected] = useState(undefined);

    // Fetch contacts when the component mounts
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/contacts"); // URL of the API
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
        
                const data = await response.json();  // Parse the response as JSON
                console.log("Fetched contacts:", data);  // Log contacts to verify
                setContacts(data);  // Update the state with the fetched contacts
            } catch (error) {
                console.error("Error fetching contacts:", error);
            }
        };
        
        fetchContacts(); // Call the function on component mount
    }, []); // Empty dependency array to only run on mount

    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser]);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);  // Pass the selected contact to the parent component
    };

    return (
        <>
            {currentUserImage && currentUserName && (
                <Container>
                    <div className="brand">
                        <img src={Logo} alt="logo" />
                        <h3>Chatty</h3>
                    </div>

                    {/* Contacts List */}
                    <div className="contacts">
                        {Array.isArray(contacts) && contacts.length > 0 ? (
                            contacts.map((contact, index) => (
                                <div
                                    className={`contact ${index === currentSelected ? "selected" : ""}`}
                                    key={contact._id}
                                    onClick={() => changeCurrentChat(index, contact)}
                                >
                                    <div className="avatar">
                                        <img src={contact.avatarImage} alt="avatar" />
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-contacts">No contacts available</p>
                        )}
                    </div>

                    {/* Current User */}
                    <div className="current-user">
                        <div className="avatar">
                            <img src={currentUserImage} alt="Current User Avatar" />
                        </div>
                        <div className="username">
                            <h3>{currentUserName}</h3>
                        </div>
                    </div>
                </Container>
            )}
        </>
    );
};

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #080420;

    .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;

        img {
            height: 2rem;
        }
        h3 {
            color: white;
            text-transform: uppercase;
        }
    }

    .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }

        .contact {
            background-color: #ffffff39;
            min-height: 5rem;
            width: 90%;
            cursor: pointer;
            border-radius: 0.2rem;
            padding: 0.4rem;
            gap: 1rem;
            align-items: center;
            display: flex;
            transition: 0.5s ease-in-out;

            .avatar img {
                height: 3rem;
            }
            .username h3 {
                color: white;
            }
        }

        .selected {
            background-color: #9186f3;
        }

        .no-contacts {
            color: white;
            text-align: center;
            font-size: 1.2rem;
            margin-top: 20px;
        }
    }

    .current-user {
        background-color: #0d0d30;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;

        .avatar img {
            height: 4rem;
            max-inline-size: 100%;
        }

        .username h3 {
            color: white;
            text-transform: uppercase;
        }
    }
`;

export default Contacts;
