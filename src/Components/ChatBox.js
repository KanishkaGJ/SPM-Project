import React, { useState } from "react";
import { IconButton } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import ChatBot from "react-simple-chatbot";

const ChatComponent = () => {
  const [chatOpened, setChatOpened] = useState(false);
  const handleUserInput = (userInput) => {
    const userInputLower = userInput.toLowerCase();
    if (
      userInputLower.includes("contact") ||
      userInputLower.includes("number")
    ) {
      return "Here's our contact number :  0776543432";
    }
    if (
      userInputLower.includes("hi") ||
      userInputLower.includes("hello") ||
      userInputLower.includes("hey") ||
      userInputLower.includes("yo")
    ) {
      return "Hey! How can I help you ?";
    }
    if (
      userInputLower.includes("return product") ||
      userInputLower.includes("return")
    ) {
      return "Oh.. To return the product you need to go through some steps. Please contact us  - 0776543432 ";
    }
    if (
      userInputLower.includes("exchange") ||
      userInputLower.includes("change")
    ) {
      return "Oh.. We don't do that usually.. But if you want to conatct us to discuss further call 0756667453";
    }
    if (
      userInputLower.includes("thank you") ||
      userInputLower.includes("thanks")
    ) {
      return "Ah.. Welcome!";
    }
    return `Please enter your question so that I can help you Thank you`;
  };
  const steps = [
    {
      id: "1",
      message: "Hello! How can I assist you today?",
      trigger: "2",
    },
    {
      id: "2",
      user: true,
      trigger: "response",
    },
    {
      id: "response",
      message: ({ previousValue }) => handleUserInput(previousValue),
      trigger: "2",
    },
  ];
  const handleChatIconClick = () => {
    setChatOpened(!chatOpened);
  };
  const chatbotStyle = {
    background: "white", // Set the background color to white
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
  };
  return (
    <>
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          backgroundColor: "black",
          borderRadius: "50%",
          padding: "10px",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "inline-block",
          }}
        >
          <IconButton aria-label="Chat" onClick={handleChatIconClick}>
            <MessageIcon style={{ color: "white" }} />
          </IconButton>
        </div>
      </div>
      {chatOpened && (
        <div
          style={{
            position: "fixed",
            bottom: 10,
            right: 10,
            zIndex: 9999,
            width: "400px",
            backgroundColor: "white",
            ...chatbotStyle, // Apply the chatbotStyle here
          }}
        >
          <IconButton
            style={{ position: "absolute", top: 5, right: 5, color: "black" }}
            onClick={() => setChatOpened(false)}
          >
            X
          </IconButton>
          <ChatBot
            steps={steps} // Define your chatbot steps here
            className="custom-chatbot"
          />
        </div>
      )}
    </>
  );
};

export default ChatComponent;