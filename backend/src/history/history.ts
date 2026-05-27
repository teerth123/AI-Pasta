import { Router } from "express";
import prisma from "../db";
export const HistoryRouter =  Router()

HistoryRouter.get("/allChats", async(req, res)=>{
    try{
        const allChats  = await prisma.chats.findMany({select:{id:true, chatName:true, dateCreated:true}})
        res.json({
            data:allChats,
            status:"+"
        })
        return
    }catch(e){
        res.json({
            msg:"errror occured",
            error:e,
            status:"-"
        })
        return
    }
})

HistoryRouter.get("/:chatId", async(req, res)=>{
    try{
        const chatIdNum = parseInt(req.params.chatId)
        const allMessages = await prisma.messages.findMany({
            where: {
                chatId: chatIdNum
            }
        })
        res.json({
            data: allMessages,
            status: "+"
        })
        return
    }catch(e){
        res.json({
            msg:"error occured",
            error:e,
            status:"-"
        })
        return
    }
})