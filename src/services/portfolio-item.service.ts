import prisma from "../config/db.js";
import { CreatePortfolioItemSchema, UpdatePortfolioItemSchema } from "../schemas/portfolio-items.schema.js";

export class PortfolioItemService {

    //Create Item
    async create( data: CreatePortfolioItemSchema ) {
        return await prisma.portfolioItem.create({
            data: {
                portfolioId: data.portfolioId,
                imageUrl: data.imageUrl,
                description: data.description ?? null
            }
        });
    }

    //Get all items
    async findAll(){
        return await prisma.portfolioItem.findMany();
    }

    //Find by Id
    async findById ( id: string ){
        return await prisma.portfolioItem.findUnique({
            where: { id }
        });
    }

    //Find by artistId
    async findByArtistId( artistId: string ){
        return await prisma.portfolioItem.findMany({
            where: { 
                portfolio:
                {
                    artistId: artistId
                }
            }
        })
    }

    //Update Item
    async updateItem( id: string, data: UpdatePortfolioItemSchema ){
        const updateData: any = {};

        if( data.imageUrl ) updateData.imageUrl = data.imageUrl;
        if( data.description !== undefined ) {
            updateData.description = data.description ?? null;
        }

        return await prisma.portfolioItem.update({
            where: { id },
            data: updateData,
        });
    }

    //Delete item
    async deleteItem( id: string ){
        return await prisma.portfolioItem.delete({
            where: { id },
        })
    }
}