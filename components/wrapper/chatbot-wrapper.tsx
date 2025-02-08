"use client";
import Chatbot from "../custom/chatbot";
import ChatPopupButton from "../custom/chat-popup-button";

type Props = {
	action: (value: boolean) => void;
	isOpen: boolean;
};

export default function ChatWrapper({ action, isOpen }: Props) {
	return (
		<>
			{!isOpen && <ChatPopupButton onClick={() => action(true)} />}
			<Chatbot isOpen={isOpen} action={() => action(false)} />
		</>
	);
}
