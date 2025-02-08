"use client";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { memo } from "react";

const LoadingIndicator = memo(() => (
	<motion.div
		initial={{ opacity: 0, y: 10 }}
		animate={{ opacity: 1, y: 0 }}
		className='flex flex-col space-y-2'
	>
		<div className='flex justify-start'>
			<div className='p-3 rounded-2xl max-w-[80%] bg-gray-200 text-gray-800 rounded-tl-none'>
				<div className='flex items-center space-x-2'>
					<Loader2 className='w-4 h-4 animate-spin' />
					<p className='text-sm'>Thinking...</p>
				</div>
			</div>
		</div>
	</motion.div>
));

LoadingIndicator.displayName = "LoadingIndicator";

export default LoadingIndicator;
