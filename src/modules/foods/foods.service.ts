import { prisma } from "../../config/db.js";

export const getAllFood = async (category?: string) => {
    return await prisma.meal.findMany({
        where: category ? { category } : {},
        orderBy: { createdAt: 'desc' }
    })
}

