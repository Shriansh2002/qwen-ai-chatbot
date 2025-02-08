type User = "user" | "bot";

export type Message = {
	sender: User;
	text: string;
};

export type UseChatbotReturnType = {
	messages: Message[];
	userInput: string;
	isLoading: boolean;
	setUserInput: (value: string) => void;
	handleSendMessage: () => void;
};
