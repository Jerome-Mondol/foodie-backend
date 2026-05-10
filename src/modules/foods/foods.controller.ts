import { Request, Response } from "express";
import { getAllFood } from "./foods.service.js";
import { getAllFoodQueryValidation } from "./foods.zod.js";

export const getFoods = async (req: Request, res: Response) => {
    // Query validation
    const { category } = req.query;
    const parsedCategory = getAllFoodQueryValidation.safeParse(category);
    if(!parsedCategory.success) {
        return res.status(400).json({ 
                success: false, 
                error: parsedCategory.error.issues?.[0]?.message || "Validation error"
        });
    } 
    const resultCategory = parsedCategory.data;



    try  {
        const foods = await getAllFood(resultCategory as string);
        res.status(200).json({ success: true, data: foods });
    }
    catch(err) {
        res.status(500).json({ success: false, error: "Error fetching meals" });
        console.log(err);
    }
}