import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './schemas/auth.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/Jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,LocalStrategy],
  exports: [AuthService,AuthModule],
  imports : [MongooseModule.forFeature([{name: Auth.name , schema: AuthSchema}]),JwtModule.registerAsync({
    inject:[ConfigService],
    useFactory: ((config : ConfigService) =>{
      return{
        secret: config.get<string>('JWT_SECRET'),
        signOptions :
        {
          expiresIn: config.get<string | number>('JWT_EXPIRES')
        }
      }
    }
  )
  })
]
})
export class AuthModule {}
