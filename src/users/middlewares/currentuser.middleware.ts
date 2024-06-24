import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { Session } from "express-session";
import { AuthService } from "src/auth/auth.service";
import { Auth } from "src/auth/schemas/auth.schema";

declare global {
    namespace Express{
        interface Request {
            currentUser?: Auth
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware{
    constructor(
        private AuthService: AuthService
    ){}

    async use(req: Request, res: Response, next: NextFunction) {
        console.log("inside the middleware")
        console.log(req.session)
   
        

        // if(userId){
        //     const user = await this.AuthService.finduser(userId)
        //     req.currentUser = user
        // }
        next();
        
    }
}