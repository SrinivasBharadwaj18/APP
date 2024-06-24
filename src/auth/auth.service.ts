import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './schemas/auth.schema';
import { Model } from 'mongoose';
import { SignUpUserDto } from './dtos/SignUpUser.dto';
import { LoginUserDto } from './dtos/LoginUser.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(Auth.name)
        private AuthModel : Model<Auth>,
        private JwtService : JwtService
    ){}

    async Signup(signupUser: SignUpUserDto): Promise<Auth>{
        console.log(signupUser)
        const {username,password}  = signupUser
        const user = await this.AuthModel.findOne({username})
        signupUser.password =await bcrypt.hash(password,10)
        if(user){
            throw new UnauthorizedException("user already present")
        }
    
        const createdUser = await this.AuthModel.create(signupUser)
        await createdUser.save()
        console.log(createdUser)
        return createdUser
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////
    async validateGetToken(loginUser: {username:string, password: string}){
        const { username, password } = loginUser
        const user = await this.AuthModel.findOne({username})
        if (!user){
            throw new UnauthorizedException("signup first")
        }
        console.log(`users password: ${user.password}`)
        console.log(`password: ${password}`)
        if(!password){
            throw new BadRequestException("no password given")
        }
        const isPasswordMatched = await bcrypt.compare(password,user.password)
        console.log(isPasswordMatched)
        if(!isPasswordMatched){
            throw new BadRequestException("invalid password")
        }else{
            const token = this.JwtService.sign({id:user._id})
            return token
        }

    }

    async login(loginUser: LoginUserDto): Promise<{token: string}>{
        const { username, password } = loginUser
        const user = await this.AuthModel.findOne({username})
        
        if (!user){
            throw new UnauthorizedException("signup first")
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if(!isPasswordMatched){
            throw new UnauthorizedException("invalid password")
        }
        const token = this.JwtService.sign({id:user._id})
        return {token}
        

        }

    async ValidateUser(username : string):Promise<Auth>{
        const user = await this.AuthModel.findOne({username})
        if (!user){
            throw new UnauthorizedException("signup first")
        }
        console.log(user)
        return user
    }

    async finduser(userId: string){
        return this.AuthModel.findById(userId)

    }
    
}
