import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({envFilePath: 'local.env'})
    // ConfigModule.forRoot({  ignoreEnvFile: true, isGlobal: true, envFilePath: '.env' }), 
  ],
})
export class AppModule {}
