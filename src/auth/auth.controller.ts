import { Body, Controller, Post, Session, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dtos/SignUpUser.dto';
import { LoginUserDto } from './dtos/LoginUser.dto';
import { LocalGuard } from './guards/local.guard';
import { SignUpCheckInterceptor } from './interceptors/signupcheck.interceptor';
// import { intercept } from './decorators/logintercept.decorator';
import { TokenInterceptor } from './interceptors/toke.interceptor';
import { Auth } from './schemas/auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('auth')
export class AuthController {
    constructor(
        @InjectModel(Auth.name)
        private AuthModel: Model<Auth>,
        private AuthService : AuthService
    ){}


    // created a post route which uses LocalAuthGuard 
    // we can use the interceptor or the middleware to check if the comming user is valid
    // @UseInterceptors(SignUpCheckInterceptor)
    @Post('/signup')
    // @UsePipes(ValidationPipe)
    async Signup(@Body() signupUser: SignUpUserDto):Promise<Auth>{
        console.log(signupUser)
        return this.AuthService.Signup(signupUser)

    }
    
    // @UseGuards(LocalGuard)
    // @UseInterceptors(TokenInterceptor)
    @Post('/login')     // this route returns a token.
    @UsePipes(ValidationPipe)
    async Login(@Body() LoginUser: LoginUserDto, @Session() session :any){
        const token = await this.AuthService.login(LoginUser)
        const { username, password} = LoginUser
        const user = await this.AuthModel.findOne({username})
        if (!user){
            
            throw new UnauthorizedException("invalid credentials")
        }
        console.log(`userid: ${user.id}`)
        console.log(session)
        session.userId = user.id
        console.log(session)
        return token
    }
}

