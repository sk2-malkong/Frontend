
import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import S from "./style";

const ChatSection = ({ messages, input, setInput, handleKeyPress, handleSendMessage }) => (
  <S.SectionWrapper1 data-aos="fade-up">
    <S.ChatArea>
      {messages.map((msg, idx) => (
        <S.ChatBubble1
          key={idx}
          align={msg.sender === "user" ? "right" : "left"}
          dangerouslySetInnerHTML={{ __html: msg.html }}
        />
      ))}
    </S.ChatArea>

    <S.InputWrapper>
      <S.Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="메시지를 입력하세요"
      />
      <S.SendButton onClick={handleSendMessage}>
        <FontAwesomeIcon icon={faPaperPlane} />
      </S.SendButton>
    </S.InputWrapper>
  </S.SectionWrapper1>
);

ChatSection.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired,
    })
  ).isRequired,
  input: PropTypes.string.isRequired,
  setInput: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
  handleSendMessage: PropTypes.func.isRequired,
};

export default ChatSection;
