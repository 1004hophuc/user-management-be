import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://Hophuc1004:Phuc101297@cluster0.nwtof.mongodb.net/user-management-be?retryWrites=true&w=majority',
      // host: process.env.MONGO_HOST,
      // port: +process.env.MONGO_PORT,
      // username: process.env.MONGO_USERNAME,
      // password: process.env.MONGO_PASSWORD,
      // database: process.env.MONGO_DB,
      // entities: [],
      // extra: { authSource: 'admin' },
      autoLoadEntities: true,
      useUnifiedTopology: true,
      logging: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
