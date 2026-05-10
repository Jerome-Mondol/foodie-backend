import { Router } from "express";
import { getFoods } from "./foods.controller.js";
const router = Router();

router.get('/', getFoods);



export default router;