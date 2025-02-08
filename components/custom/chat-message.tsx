import { memo } from "react";
import { motion } from "framer-motion";
import { Message } from "@/types";

const ChatMessage = memo(({ sender, text }: Message) => (
	<motion.div
		initial={{ opacity: 0, y: 10 }}
		animate={{ opacity: 1, y: 0 }}
		className='flex flex-col space-y-2'
	>
		<div
			className={`flex ${
				sender === "user" ? "justify-end" : "justify-start"
			}`}
		>
			<div
				className={`p-3 rounded-2xl max-w-[80%] ${
					sender === "user"
						? "bg-blue-500 text-white rounded-tr-none"
						: "bg-gray-200 text-gray-800 rounded-tl-none"
				}`}
			>
				<p className='text-sm'>{text}</p>
			</div>
		</div>
	</motion.div>
));

ChatMessage.displayName = "ChatMessage";

export default ChatMessage;
