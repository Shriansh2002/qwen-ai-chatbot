"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import useChatbot from "@/hooks/useChatbot";
import ChatMessage from "./chat-message";
import LoadingIndicator from "./loading-indicator";

export default function Chatbot() {
	const messagesEndRef = useRef<HTMLDivElement | null>(null);

	const { handleSendMessage, isLoading, messages, setUserInput, userInput } =
		useChatbot();

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<div className='min-h-screen bg-gray-100 p-4 flex flex-col items-center'>
			<motion.h1
				className='text-2xl font-bold mb-6 text-gray-800'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
			>
				Chatbot Interface
			</motion.h1>
			<Card className='w-full max-w-2xl bg-white shadow-lg'>
				<CardContent className='p-4'>
					<div className='h-[500px] overflow-y-auto mb-4 space-y-4'>
						{messages.map((message, index) => (
							<ChatMessage
								key={index}
								sender={message.sender}
								text={message.text}
							/>
						))}
						{isLoading && <LoadingIndicator />}
						<div ref={messagesEndRef} />
					</div>
					<div className='flex items-center space-x-2 pt-3 border-t'>
						<Input
							placeholder='Type your message...'
							value={userInput}
							onChange={(e) => setUserInput(e.target.value)}
							className='flex-1'
							onKeyDown={(e) =>
								e.key === "Enter" && handleSendMessage()
							}
							disabled={isLoading}
							aria-label='Type your message'
						/>
						<Button
							onClick={handleSendMessage}
							className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2'
							disabled={isLoading}
							aria-label='Send message'
						>
							{isLoading ? (
								<Loader2 className='w-4 h-4 animate-spin' />
							) : (
								"Send"
							)}
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
