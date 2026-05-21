    import { Router } from "express";
    import { AI_response } from "../AICalls/call";
    import prisma from "../db";

    export const ChatRouter = Router();

    ChatRouter.post("/newChat", async (req, res)=>{
        let newChat: any | undefined;
        try{
            const {modelUsed, prompt} = req.body
            //we need a middleware that checks if prompt is not empty, model is correct, etc
            newChat = await prisma.chats.create({
                data:{
                    chatName : (prompt || "").substring(0, 30)
                }
            })
            
            const output = await AI_response(modelUsed, prompt, newChat.id)
            const relatedQueries = "relatedQueries"

            // Guard: ensure output is present and a string before writing to DB
            if(!output || typeof output !== 'string'){
                throw new Error('AI returned empty output')
            }

            await prisma.messages.create({
                data:{
                    prompt:prompt,
                    output:output,
                    modelUsed:modelUsed,
                    chatId:Number(newChat.id),
                    relatedQueries:relatedQueries
                }
            })

            res.json({
                output:output,
                relatedQueries:relatedQueries,
                chatId:newChat.id,
                status:"+"
            })
            return
        }catch(e){
            // If we created a chat but the AI call (or DB write) failed, delete the empty chat.
            try{
                if(newChat && newChat.id){
                    await prisma.chats.delete({ where: { id: Number(newChat.id) } })
                }
            }catch(deleteErr){
                console.error('failed to delete orphaned chat', deleteErr)
            }

            console.error(e)
            return res.status(500).json({
                msg:"error occured",
                status:"-",
                error: e instanceof Error ? e.message : e
            })
        }
    })

    ChatRouter.post("/:chatId", async (req, res) => {
        try{
            const chatIdNum = Number(req.params.chatId)
            const {modelUsed, prompt} = req.body

            if(!Number.isInteger(chatIdNum)){
                res.status(400).json({
                    msg:"invalid chat id",
                    status:"-"
                })
                return
            }
        
            const oldChat = await prisma.chats.findUnique({
                where:{
                    id : chatIdNum,
                }
            })

            if(oldChat){
                const output = await AI_response(modelUsed, prompt, chatIdNum)
                const relatedQueries = "relatedQueries"

                res.json({
                    output:output,  
                    relatedQueries:relatedQueries,
                    status:"+"
                })
                return
            }else{
                res.json({
                    msg:"chat not found",
                    status:"-"
                })
                return
            }
        }catch(e){
            console.error(e)
            res.status(500).json({
                msg:"error occured",
                status:"-",
                error: e instanceof Error ? e.message : e
            })
            return
        }
    });
