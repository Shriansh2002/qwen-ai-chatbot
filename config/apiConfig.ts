export const API_CONFIG = {
	url: "http://localhost:11434/api/generate",
	timeout: 10000,
	model: process.env.NEXT_PUBLIC_MODEL_NAME || "qwen2:1.5b",
} as const;
