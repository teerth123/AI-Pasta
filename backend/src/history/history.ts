import { Router } from "express";
import prisma from "../db";
export const HistoryRouter =  Router()

HistoryRouter.get("/history", async(req, res)=>{
    try{
        const allChats  = await prisma.chats.findMany({select:{chatName:true, dateCreated:true}})
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