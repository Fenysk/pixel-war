import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Config } from 'src/pixels/dto/config.dto';
import { Pixel } from 'src/pixels/dto/pixel.dto';
import { PixelsService } from 'src/pixels/pixels.service';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway()
export class GameGateway implements OnGatewayInit<any>, OnGatewayConnection<any>, OnGatewayDisconnect<any> {
    constructor(
        private readonly pixelsService: PixelsService,
        private readonly usersService: UsersService
    ) { }

    @WebSocketServer() socket: Server;

    async afterInit(server: Server): Promise<any> {
        console.log('Socket.io server initialized 😎');
    }

    async handleConnection(client: Socket): Promise<any> {
        const users = await this.usersService.addUser(client.id)
        this.socket.emit('updateUsers', users)

        const canvas = await this.pixelsService.getCanvas()
        this.socket.emit('initGame', canvas)
    }

    async handleDisconnect(client: any): Promise<any> {
        const users = await this.usersService.removeUser(client.id)
        this.socket.emit('updateUsers', users)
    }

    @SubscribeMessage('resetGame')
    async handleMessage(client: any, _config: any): Promise<any> {
        await this.usersService.resetUsers()
        await this.pixelsService.resetGame(_config as Config)
    }

    @SubscribeMessage('setPixel')
    async setPixel(client: any, _editedPixel: Pixel): Promise<any> {
        const editedPixel = await this.pixelsService.setPixel(_editedPixel)
        this.socket.emit('updatePixel', editedPixel)
    }

}
