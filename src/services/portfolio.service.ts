import prisma from "../config/db.js";
import { CreatePortfolioSchema, UpdatePortfolioSchema } from "../schemas/portfolio.schema.js";

export class Portfolio {

    //Create portfolio
    async create( data: CreatePortfolioSchema ){
        return await prisma.portfolio.create({
            data: {
                artistId: data.artistId,
            },
            include: {
                items: true,
            }
        });
    }

    //Find artistById
    async findArtistById( artistId: string ){
        return await prisma.portfolio.findUnique({
            where: { artistId },
            include: {
                items: true,
            }
        });
    }

    //Delete portfolio
    async deletePortfolio( id: string ){
        return await prisma.portfolio.delete({
            where: { id },

        });
    }
}