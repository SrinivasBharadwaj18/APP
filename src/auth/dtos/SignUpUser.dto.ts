import { IsString } from "class-validator"


export class SignUpUserDto{

    @IsString()
    username: string

    @IsString()
    email_id: string
    
    @IsString()
    password : string

}