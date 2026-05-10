import { Request, Response } from "express";
import { getAllFood } from "./foods.service.js";

export const getFoods = async (req: Request, res: Response) => {
    const { category } = req.query;
    try  {
        const foods = await getAllFood(category as string);
        res.status(200).json({ success: true, data: foods });
    }
    catch(err) {
        res.status(500).json({ success: false, error: "Error fetching meals" });
        console.log(err);
    }
}