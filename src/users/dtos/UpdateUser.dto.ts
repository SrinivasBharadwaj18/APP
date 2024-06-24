import { IsInt, IsOptional, IsString } from "class-validator";



export class UpdateUserDto{
    
    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    username?: string

    @IsInt()
    @IsOptional()
    age?: number

}