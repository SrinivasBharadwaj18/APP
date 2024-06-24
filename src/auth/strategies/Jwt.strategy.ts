import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import * as bcrypt from 'bcrypt';
import { InjectModel } from "@nestjs/mongoose";
import { Auth } from "../schemas/auth.schema";
import { Model } from "mongoose";





Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(Auth.name)
        private AuthModel: Model<Auth>
    ){
        super({ //the passport jwt strategy needs the jwtfromrequest and the secretorkey
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET

        })
    }
    async validate(payload){
        console.log(payload)
        const { id } = payload
        console.log("inside the jwt strategy")
        const user = await this.AuthModel.findById(id)
        console.log(user)
        if(!user){
            throw new UnauthorizedException("login first to acess this route")
        }
        // const isPasswordMatched = await bcrypt.compare(user.password, password)
        // if(!isPasswordMatched){
        //     throw new UnauthorizedException(" incorrect password")

        // }
        return user

    }
}
