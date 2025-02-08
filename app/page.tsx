"use client";
import { useState } from "react";
import Hero from "@/components/wrapper/hero";
import ChatWrapper from "@/components/wrapper/chatbot-wrapper";

export default function Home() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Hero action={() => setIsOpen(true)} />
			<ChatWrapper isOpen={isOpen} action={setIsOpen} />
		</>
	);
}
