import axios from "axios";
import { React, useState } from "react";
import styled from "styled-components";
import { chatBotRoute } from "../utils/APIRoutes";
export default function Logout() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleClick();
    }
  };

  const handleClick = async () => {
    if (query === "") {
      setOutput("Please Enter your query!");
      return;
    }
    setLoading(true);
    const result = await axios.post(chatBotRoute, { query });
    setOutput(result.data);
    setQuery("");
    setLoading(false);
  };

  return (
    <Container>
      <div
        className={`chatbot-icon ${isOpen ? "open" : ""}`}
        onClick={toggleChat}
      >
        <i className="fa fa-comments"></i>
      </div>
      <div className={`chatbot-window ${isOpen ? "open" : ""}`}>
        <div className="chatbot-header">
          <h4>Ask Chappy</h4>
          <button className="close-bot" onClick={toggleChat}>
            X
          </button>
        </div>
        <div className="chatbot-body">
          <div style={{ display: "flex" }}>
            <input
              className="chat-bot-input"
              type="text"
              placeholder="Enter Prompt"
              onChange={handleChange}
              value={query}
              onKeyDown={handleKeyDown}
            ></input>
            <button className="send-button" onClick={handleClick}>
              send
            </button>
          </div>
          <br></br>
          {!loading ? (
            <p style={{ textAlign: "justify", lineHeight: "1.5" }}>{output}</p>
          ) : (
            <p
              style={{ color: "grey", textAlign: "justify", lineHeight: "1.5" }}
            >
              Chappy is Typing...
            </p>
          )}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  bottom: 60px;
  right: 50px;
  z-index: 1000;

  .chatbot-icon {
    background-color: #007bff;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .chatbot-icon.open {
    transform: rotate(45deg);
  }

  .chatbot-window {
    position: fixed;
    bottom: 120px;
    right: 50px;
    width: 65%;
    height: 40%;
    background-color: white;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    overflow: hidden;
    transform: scale(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease;
  }

  .chatbot-window.open {
    transform: scale(1);
  }

  .chatbot-header {
    background-color: #007bff;
    color: white;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .close-bot {
    background-color: #007bff;
    border-radius: 50%;
    border: none;
    outline: none;
    color: white;
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .chat-bot-input {
    width: 100%;
    padding: 10px 0;
    border: none;
    border-bottom: 2px solid #ccc;
    outline: none;
    font-size: 14px;
    box-sizing: border-box;
    background: transparent;
  }

  .send-button {
    padding: 0 4px;
    background-color: black;
    color: white;
    border-radius: 10px;
    margin-left: 10px;
  }

  .chatbot-body {
    padding: 10px;
    height: calc(100% - 40px);
    overflow-y: auto;
  }
`;
