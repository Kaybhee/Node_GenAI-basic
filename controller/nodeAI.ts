import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
    throw new Error('GOOGLE_API_KEY environment variable is not set');
}


interface model{ model: string, maxOutputTokens?: number,  invoke: (prompt: any) => Promise<any> } interface typeModel extends model { apiKey?: string,} 
const aiModel: typeModel = new ChatGoogleGenerativeAI({
    apiKey,
    model: "gemini-2.5-flash",
    maxOutputTokens: 2048
})

export const chatModel = async(req: any, res: any) => {
    const { prompt } = req.body
    try {
        const response = await generateResponse(prompt)
        return res.status(200).json({ status: true, data: response })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ status: false, data: null})
    }
}

const generateResponse = async(prompt: any) => {
    try {
        const response = await aiModel.invoke(prompt)
        // console.log(response.content)
        return response.content
    } catch (err) {
        console.error(err)
        throw err
    }
}