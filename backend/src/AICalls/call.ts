import prisma from "../db";
import axios from "axios";
import { SYSTEM_PROMPT } from "../SYSTEM_PROMPT";

export async function AI_response(model:string, prompt:string, chatId:number){
    const OPENROUTER_KEY = process.env.OPENROUTER_KEY

    if(!OPENROUTER_KEY){
        throw new Error("openrouter key not found");
    }
        
    try{
        const context = await Context(chatId)

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model,

                messages: [
                    {
                        role: "system",
                        content: SYSTEM_PROMPT,
                    },

                    ...context,

                    {
                        role: "user",
                        content: prompt,
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENROUTER_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data.choices[0].message.content;
    }catch(e){
        if(axios.isAxiosError(e)){
            const apiMessage = e.response?.data?.error?.message || e.response?.data?.message || e.message;
            throw new Error(`OpenRouter request failed: ${apiMessage}`);
        }

        throw e;
    }
}

export async function Context(chatId:number){
    try{
        const data = await prisma.messages.findMany({
            where:{
                chatId:chatId
            },
            orderBy:{
                id:"desc"
            },
            take:5
        })
        data.reverse()
        const formattedData = data.flatMap((d)=>[
            {
                role:"user",
                content:d.prompt
            },
            {
                role:"assistant",
                content:d.output
            }
        ])

        return formattedData
    }catch(e){
        throw new Error("error occured")
    }
}
