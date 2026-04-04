import prisma from "../config/db.js";
import { CreatePortfolioSchema, UpdatePortfolioSchema } from "../schemas/portfolio.schema.js";

export class PortfolioService {

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

    //find all
    async findAll() {
        return await prisma.portfolio.findMany({
            include: {
                items: true
            }
        });
    }

    //Find by id
    async findById( id: string ){
        return await prisma.portfolio.findUnique({
            where: { id },
            include: {
                items: true
            }
        });
    }
    //Find artistById
    async findArtistById( artistId: string ){
        return await prisma.portfolio.findFirst({
            where: { artistId },
            include: {
                items: true,
            }
        });
    }

    //Update
    async updatePortfolio( id: string, data: UpdatePortfolioSchema ){
        const updateData: any = {};
        if( data.artistId !== undefined ){
            updateData.artistId = data.artistId;
        }
        return await prisma.portfolio.update({
            where: { id },
            data: updateData,
            include: {
                items: true
            }
        })
    }

    //Delete portfolio
    async deletePortfolio( id: string ){
        return await prisma.portfolio.delete({
            where: { id },

        });
    }
}