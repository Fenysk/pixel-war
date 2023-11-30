import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { GameModule } from './game/game.module';
import { UsersModule } from './users/users.module';
import { PixelsModule } from './pixels/pixels.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'client'),
        }),
        PrismaModule,
        GameModule,
        UsersModule,
        UsersModule,
        PixelsModule
    ],
})
export class AppModule { }
