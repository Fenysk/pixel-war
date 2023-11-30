import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { PixelsModule } from 'src/pixels/pixels.module';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        PixelsModule,
        UsersModule
    ],
    providers: [GameGateway]
})
export class GameModule { }
