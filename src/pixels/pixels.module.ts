import { Module } from '@nestjs/common';
import { PixelsService } from './pixels.service';

@Module({
    providers: [PixelsService],
    exports: [PixelsService],
})
export class PixelsModule { }
