import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";



@Injectable()
export class SignUpCheckInterceptor implements NestInterceptor{
    constructor(

    ){}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        
        const request = context.switchToHttp().getRequest()
        const { username , email_id , password } = request.body

        console.log(username, email_id, password)

        if(!username || !email_id || !password){
            throw new UnauthorizedException("Bad Request")
        }
        return next.handle()
    }
}