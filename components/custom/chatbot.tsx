"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function ChatbotFrontend() {
	const [messages, setMessages] = useState([
		{ sender: "bot", text: "Hello! How can I assist you today?" },
	]);
	const [userInput, setUserInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSendMessage = async () => {
		if (!userInput.trim() || isLoading) return;

		const userMessage = { sender: "user", text: userInput };
		setMessages((prev) => [...prev, userMessage]);
		setUserInput("");
		setIsLoading(true);

		try {
			const response = await fetch(
				"http://localhost:11434/api/generate",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						model: "qwen2:1.5b",
						prompt: userInput,
						stream: false,
					}),
				}
			);

			const data = await response.json();

			if (data?.response) {
				setMessages((prev) => [
					...prev,
					{ sender: "bot", text: data.response },
				]);
			}
		} catch {
			setMessages((prev) => [
				...prev,
				{
					sender: "bot",
					text: "Sorry, there was an error connecting to the model.",
				},
			]);
		} finally {
			setIsLoading(false);
		}
	};

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
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								className='flex flex-col space-y-2'
							>
								<div
									className={`flex ${
										message.sender === "user"
											? "justify-end"
											: "justify-start"
									}`}
								>
									<div
										className={`p-3 rounded-2xl max-w-[80%] ${
											message.sender === "user"
												? "bg-blue-500 text-white rounded-tr-none"
												: "bg-gray-200 text-gray-800 rounded-tl-none"
										}`}
									>
										<p className='text-sm'>
											{message.text}
										</p>
									</div>
								</div>
							</motion.div>
						))}
						{isLoading && (
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								className='flex flex-col space-y-2'
							>
								<div className='flex justify-start'>
									<div className='p-3 rounded-2xl max-w-[80%] bg-gray-200 text-gray-800 rounded-tl-none'>
										<div className='flex items-center space-x-2'>
											<Loader2 className='w-4 h-4 animate-spin' />
											<p className='text-sm'>
												Thinking...
											</p>
										</div>
									</div>
								</div>
							</motion.div>
						)}
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
						/>
						<Button
							onClick={handleSendMessage}
							className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2'
							disabled={isLoading}
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
