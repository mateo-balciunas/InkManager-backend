import prisma from "../config/db.js";
import { CreateArtistSchema, UpdateArtistSchema } from "../schemas/artist.schema.js";

const artistSelect = {
    id: true,
    userId: true,
    companyId: true,
    bio: true,
    specialties: true
}

export class Artist {

    //Create Artist
    async create( data: CreateArtistSchema ) {
        return await prisma.artist.create({
            data: {
                userId: data.userId,
                companyId: data.companyId,
                bio: data.bio,
                specialties: data.specialties
            },
            select: artistSelect
        });
    }

    //Find Artist by ID, userId and companyId
    async findAllArtists() {
        return await prisma.artist.findMany({
            select: artistSelect
        });
    }

    async findById( id: string ){
        return await prisma.artist.findUnique({
            where: { id },
            select: artistSelect
        });
    }

    async findByUserId( userId: string ){
        return await prisma.artist.findMany({
            where: { userId },
            select: artistSelect,
        });
    }

    async findByCompanyId( companyId: string ){
        return await prisma.artist.findMany({
            where: { companyId },
            select: artistSelect
        });
    }

    //Delete Artist
    async deleteArtist( id: string ){
        return await prisma.artist.delete({
            where: { id },
            select: artistSelect
        });
    }

    //Update Artist
    async updateArtist( id: string, data: UpdateArtistSchema ) {
        const updateData: any = { ...data };

        return await prisma.artist.update({
            where: { id },
            data: updateData,
            select: artistSelect
        });
    } 
}