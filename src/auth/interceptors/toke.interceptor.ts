import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Observable } from "rxjs";
import { Auth } from "../schemas/auth.schema";
import { Model } from "mongoose";
import { AuthService } from "../auth.service";


@Injectable()
export class TokenInterceptor implements NestInterceptor{
    constructor(
        @InjectModel(Auth.name) private AuthModel : Model<Auth>,
        private AuthService: AuthService
    ){}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log("inside the inerceptor")
        const request = context.switchToHttp().getRequest()
        console.log(request)
        const { username, password } = request.body
        if (!password){
            throw new BadRequestException("no password")
        }
        console.log(username , password)
        const token  = this.AuthService.validateGetToken({username,password})

        const response = context.switchToHttp().getResponse()
        response.setHeader('Authorization', `Bearer ${token}`)
        
        return next.handle()
    }
}