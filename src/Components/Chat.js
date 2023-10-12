import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { Person as UserIcon } from "@mui/icons-material";

export const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [showChatbot, setShowChatbot] = useState(true);

  const handleSendMessage = () => {
    const userMessage = input.trim();
    const newUserMessage = { text: userMessage, user: "user" };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    if (
      userMessage.toLowerCase() === "hi" ||
      userMessage.toLowerCase() === "hey" ||
      userMessage.toLowerCase() === "hello" ||
      userMessage.toLowerCase() === "yo"
    ) {
      const botResponse = {
        text: "Hello again... How can I help you?",
        user: "bot",
      };
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 500);
    } else {
      // Handle other user messages here or leave empty for simplicity
    }

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const closeChatbot = () => {
    setShowChatbot(false);
  };

  useEffect(() => {
    if (showChatbot && messages.length === 0) {
      setMessages([{ text: "Hi. How can I help you today?", user: "bot" }]);
    }
  }, [showChatbot, messages]);

  return (
    <div>
      {showChatbot && (
        <Card
          style={{
            width: "350px",
            height: "500px",
            position: "fixed",
            bottom: "10px",
            right: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "5px",
              }}
            >
              <div></div>
              <button
                onClick={closeChatbot}
                style={{
                  color: "white",
                  background: "black",
                  border: "none",
                  cursor: "pointer",
                  alignSelf: "flex-start",
                  borderRadius: "50%", // Make the button round
                  padding: "15px", // Optional: Add padding for a larger round button
                }}
              >
                X
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto" }}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  style={{
                    display: "inline-block",
                    background:
                      message.user === "user" ? "lightgrey" : "lightgrey",
                    margin: "5px",
                    padding: "10px",
                    borderRadius:
                      message.user === "user"
                        ? "10px 10px 10px 0"
                        : "10px 10px 0 10px",
                    textAlign: message.user === "user" ? "right" : "left",
                    float: message.user === "user" ? "right" : "left",
                  }}
                >
                  {message.user === "user" ? (
                    <UserIcon
                      fontSize="small"
                      style={{
                        verticalAlign: "middle",
                        marginRight: "5px",
                        color: "blue",
                      }}
                    />
                  ) : (
                    <SendIcon
                      fontSize="small"
                      style={{
                        verticalAlign: "middle",
                        marginRight: "5px",
                        color: "black",
                      }}
                    />
                  )}
                  {message.text}
                </div>
              ))}
            </div>
            <div
              className="message-input"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <TextField
                label="Type a message"
                variant="standard"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{ flex: 1 }}
              />
              <Button
                variant="outlined"
                onClick={handleSendMessage}
                style={{ color: "black", borderColor: "black" }}
              >
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
