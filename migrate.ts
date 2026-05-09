import { PrismaClient } from './generated/prisma/client.js';

import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

type MealApiItem = {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strMealThumb: string;
};

async function migrateData () {

    console.log("Starting migration");

    try {
        const { data } = await axios.get<{ meals: MealApiItem[] | null }>("https://www.themealdb.com/api/json/v1/1/search.php?s=s");
        const rawMeals = data.meals;

        if (!rawMeals) return;

        const mealsToInsert = rawMeals.map((m) => ({
            id: m.idMeal,
            name: m.strMeal,
            category: m.strCategory,
            area: m.strArea,
            image: m.strMealThumb,
            price: Number((Math.random() * 20 + 10).toFixed(2)),
            deliveryRadius: Number((Math.random() * 10 + 5).toFixed(2)),
            prepTime: Math.floor(Math.random() * 30) + 20,
        }));

        const [deletedResult, insertResult] = await prisma.$transaction([
            prisma.meal.deleteMany(),
            prisma.meal.createMany({
                data: mealsToInsert,
            }),
        ]);

        console.log(`Data migration done. Deleted ${deletedResult.count}, inserted ${insertResult.count} meals.`);



    } catch(err) {
        console.log(err);
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
}

migrateData();