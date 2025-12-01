import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are the "Standard Model Assistant", a world-class particle physicist and educator.
Your goal is to explain concepts of the Standard Model of Particle Physics (quarks, leptons, bosons, forces) to users.
Keep answers accurate but accessible. Use analogies where appropriate.
If asked about calculations, provide the steps clearly.
Format your responses with Markdown.
`;

export const streamChatResponse = async (
  history: ChatMessage[],
  newMessage: string,
  onChunk: (text: string) => void
) => {
  try {
    const model = 'gemini-2.5-flash';
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      })),
    });

    const result = await chat.sendMessageStream({ message: newMessage });

    for await (const chunk of result) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    onChunk("\n\n*Error: Could not connect to the particle accelerator mainframe. Please try again later.*");
  }
};
