export interface Chocolate {
  id: string;
  name: string;
  description: string;
  note: string;
  type: string;
  emoji: string;
  color: string;
  texture: string;
}

export interface LoveQuote {
  text: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_DISCORD_WEBHOOK_URL?: string;
      GEMINI_API_KEY?: string;
    }
  }
}
