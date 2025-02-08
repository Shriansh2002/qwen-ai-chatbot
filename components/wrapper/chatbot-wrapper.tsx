"use client";
import { useState } from "react";
import Chatbot from "../custom/chatbot";
import ChatPopupButton from "../custom/chat-popup-button";

export default function ChatWrapper() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{!isOpen && <ChatPopupButton onClick={() => setIsOpen(true)} />}
			<Chatbot isOpen={isOpen} action={() => setIsOpen(false)} />
		</>
	);
}
