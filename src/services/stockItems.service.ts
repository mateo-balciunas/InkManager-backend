import prisma from "../config/db.js";
import { CreateStockItemSchema, UpdateStockItemSchema } from "../schemas/stockItems.schema.js";

export class StockItemService {

    //Create StockItem
    async create( data: CreateStockItemSchema ){
        return await prisma.stockItem.create({
            data: {
                name: data.name,
                description: data.description ?? null,
                brand: data.brand,
                price: data.price,
                quantity: data.quantity,
                artistId: data.artistId ?? null,
                companyId: data.companyId ?? null,
            }
        });
    }

    //Find all items, find by id, find by artist id
    async findAll() {
        return await prisma.stockItem.findMany();
    }

    async findById( id: string ){
        return await prisma.stockItem.findUnique({
            where:{ id }
        });
    }

    async findByArtistId( artistId: string ){
        return await prisma.stockItem.findMany({
            where: { artistId }
        });
    }

    //Update items
    async updateItems( id: string, data: UpdateStockItemSchema ){
        const updateData: any = {};

        if( data.name !== undefined ) updateData.name = data.name;
        if( data.description !== undefined ) updateData.description = data.description ?? null;
        if( data.brand !== undefined ) updateData.brand = data.brand;
        if( data.price !== undefined) updateData.price = data.price;
        if( data.quantity !== undefined ) updateData.quantity = data.quantity;
        if( data.artistId !== undefined ) updateData.artistId = data.artistId ?? null;
        if( data.companyId !== undefined ) updateData.companyId = data.companyId ?? null;

        return await prisma.stockItem.update({
            where: { id },
            data: updateData,
        });
    }

    //Delete items
    async deleteItems( id: string ){
        return await prisma.stockItem.delete({
            where: { id }
        });
    }
}