"use client";
import { API_CONFIG } from "@/config/apiConfig";
import { Message, UseChatbotReturnType } from "@/types";
import { useState } from "react";

const useChatbot = (): UseChatbotReturnType => {
	const [messages, setMessages] = useState<Message[]>([
		{ sender: "bot", text: "Hello! How can I assist you today?" },
	]);
	const [userInput, setUserInput] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSendMessage = async () => {
		if (!userInput.trim() || isLoading) return;

		const userMessage: Message = { sender: "user", text: userInput };
		setMessages((prev) => [...prev, userMessage]);
		setUserInput("");
		setIsLoading(true);

		const controller = new AbortController();
		const timeoutId = setTimeout(
			() => controller.abort(),
			API_CONFIG.timeout
		);

		try {
			const response = await fetch(API_CONFIG.url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					model: API_CONFIG.model,
					prompt: userInput,
					stream: false,
				}),
				signal: controller.signal,
			});

			clearTimeout(timeoutId);

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			const data = await response.json();

			if (data?.response) {
				setMessages((prev) => [
					...prev,
					{ sender: "bot", text: data.response },
				]);
			}
		} catch (error: unknown) {
			setMessages((prev) => [
				...prev,
				{
					sender: "bot",
					text:
						(error as Error).name === "AbortError"
							? "Request timed out. Please try again."
							: "Sorry, there was an error connecting to the model.",
				},
			]);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		messages,
		userInput,
		isLoading,
		setUserInput,
		handleSendMessage,
	};
};

export default useChatbot;
