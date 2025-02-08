import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatPopupButtonProps {
	onClick: () => void;
}

export default function ChatPopupButton({ onClick }: ChatPopupButtonProps) {
	return (
		<Button
			onClick={onClick}
			className='fixed bottom-4 right-4 rounded-full w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
			aria-label='Open chat'
		>
			<MessageCircle className='w-6 h-6' />
		</Button>
	);
}
