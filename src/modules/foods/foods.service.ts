import { prisma } from "../../config/db.js";

export const getAllFood = async (page: number, limit: number, category?: string, ) => {
    // Calculate how many items to skip
    const skip: number = (page - 1) * limit;

    return await prisma.meal.findMany({
        where: category ? { category } : {},
        orderBy: { createdAt: 'desc' },
        skip: skip, // Skip the previous pages
        take: limit, // Take only the amount for the current page
    });
}

