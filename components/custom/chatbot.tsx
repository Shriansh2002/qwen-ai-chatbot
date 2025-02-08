"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { useEffect, useRef } from "react";
import useChatbot from "@/hooks/useChatbot";
import ChatMessage from "./chat-message";
import LoadingIndicator from "./loading-indicator";
import { ChatbotProps } from "@/types";

export default function Chatbot({ isOpen, action }: ChatbotProps) {
	const messagesEndRef = useRef<HTMLDivElement | null>(null);

	const { handleSendMessage, isLoading, messages, setUserInput, userInput } =
		useChatbot();

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					className='fixed bottom-4 right-4 z-50'
				>
					<Card className='w-[400px] bg-white shadow-lg'>
						<div className='flex justify-between items-center p-4 border-b'>
							<h2 className='text-lg font-semibold'>
								Chat Assistant
							</h2>
							<Button
								variant='ghost'
								size='icon'
								onClick={action}
								className='h-8 w-8'
								aria-label='Close chat'
							>
								<X className='h-4 w-4' />
							</Button>
						</div>
						<CardContent className='p-4'>
							<div className='h-[400px] overflow-y-auto mb-4 space-y-4'>
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
									onChange={(e) =>
										setUserInput(e.target.value)
									}
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
				</motion.div>
			)}
		</AnimatePresence>
	);
}
