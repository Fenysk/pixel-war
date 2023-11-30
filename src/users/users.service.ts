import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) { }

    async getUsers() {
        try {
            return await this.prismaService.user.findMany()
        } catch (error) { }
    }

    async addUser(id: string) {
        try {
            await this.prismaService.user.create({
                data: { id }
            })
        } catch (error) { } finally {
            return await this.getUsers()
        }
    }

    async removeUser(id: string) {
        try {
            await this.prismaService.user.delete({
                where: { id }
            })
        } catch (error) { } finally {
            return await this.getUsers()
        }
    }

    async resetUsers() {
        try {
            await this.prismaService.user.deleteMany()
        } catch (error) { } finally {
            return await this.getUsers()
        }
    }

}
