import { Body, Controller, Get, Param, Patch, Post, Session, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Users } from './schemas/users.schema';


@Controller('users')
export class UsersController {
    constructor(
        private UsersService : UsersService
    ){}

    @UseGuards(JwtGuard)
    @Get()
    GetAllUsers(@Session() session: any){
        console.log(session.userId)
        return this.UsersService.GetAllUsers()
    }
    
    @UseGuards(JwtGuard)
    @Post()
    async CreateUser(@Body() createUser :  CreateUserDto):Promise<Users>{
        const user = await this.UsersService.CreateUser(createUser)
        return user
    }
    
    @UseGuards(JwtGuard)
    @Get(':id')
    async GetUSerById(@Param('id') id: string):Promise<Users>{
        return await this.UsersService.GetUserById(id)
    }
    
    @UseGuards(JwtGuard)
    @Patch(':id')
    async UpdateUserById(@Param('id') id: string , @Body() updateUser : UpdateUserDto):Promise<Users>{
        return await this.UsersService.UpdateUserById(id, updateUser)
    }

    
}
