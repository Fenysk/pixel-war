import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Config } from './dto/config.dto';
import { Colors } from './enum/colors.enum';

@Injectable()
export class PixelsService {
    constructor(private readonly prismaService: PrismaService) { }

    async resetGame(config: Config) {
        const { width, height } = config

        await this.prismaService.pixel.deleteMany()
        await this.prismaService.user.deleteMany()

        const canvas = await this.prismaService.pixel.createMany({
            data: Array.from({ length: width * height }, (_, index) => ({
                x: index % width,
                y: Math.floor(index / width),
                color: Colors.BLACK,
            })),
            skipDuplicates: true,
        })

        console.log(canvas)
    }

    async getCanvas() {
        try {
            return await this.prismaService.pixel.findMany()
        } catch (error) { }
    }

    async setPixel(_editedPixel: any) {
        try {
            const { x, y, color } = _editedPixel
            const editedPixel = await this.prismaService.pixel.update({
                where: { x_y: { x, y } },
                data: { color }
            })
            return editedPixel
        } catch (error) { }
    }

}
