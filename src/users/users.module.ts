import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schemas/users.schema';
import { CurrentUserMiddleware } from './middlewares/currentuser.middleware';
import { AuthModule } from 'src/auth/auth.module';
const cookieSession = require('cookie-session')

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [MongooseModule.forFeature([{name:Users.name, schema: UsersSchema}]),AuthModule]
})
export class UsersModule {
  // configure(consumer:MiddlewareConsumer){
  //   consumer
  //   .apply(CurrentUserMiddleware,
  //     cookieSession({
  //       keys:['itachi18']
  //     })
  //   )
  //   .forRoutes('*')
  // }
}
