import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JsonWebTokenStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    //.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.WEBTOKEN_SECRET_KEY,
      signOptions: { expiresIn: '365 days' },
    }),
    // JwtModule.registerAsync({
    //   imports: [],
    //   useFactory: async () => {
    //     return {
    //       secret: process.env.WEBTOKEN_SECRET_KEY,
    //       signOptions: {
    //         ...(process.env.WEBTOKEN_EXPIRATION_TIME
    //           ? {
    //               expiresIn: Number(process.env.WEBTOKEN_EXPIRATION_TIME),
    //             }
    //           : {}),
    //       },
    //     };
    //   },
    //   inject: [],
    // }),
  ],
  providers: [AuthService, LocalStrategy, JsonWebTokenStrategy],
  controllers: [AuthController],
  exports: [PassportModule.register({ defaultStrategy: 'jwt' })],
})
export class AuthModule {}
