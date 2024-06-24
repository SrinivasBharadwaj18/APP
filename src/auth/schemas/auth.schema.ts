import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema()
export class Auth {

    @Prop()
    username : string

    @Prop()
    email_id: string

    @Prop()
    password : string


}

export const AuthSchema = SchemaFactory.createForClass(Auth)