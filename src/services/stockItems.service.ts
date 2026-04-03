import prisma from "../config/db.js";
import { CreateStockItemSchema, UpdateStockItemSchema } from "../schemas/stockItems.schema.js";

export class StockItemService {

    //Create StockItem
    async create( data: CreateStockItemSchema ){
        return await prisma.stockItems.create({
            data: {
                name: data.name,
                description: data.description,
                brand: data.brand,
                price: data.price,
                quantity: data.quantity
            }
        });
    }
}