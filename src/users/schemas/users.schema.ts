import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Users {

    @Prop()
    name: string

    @Prop()
    username: string

    @Prop()
    age: number
}

export const UsersSchema = SchemaFactory.createForClass(Users)