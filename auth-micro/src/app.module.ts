import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { schemaValidConfig } from './configs/schema.config';
import { typeOrmConfigAsync } from './configs/typeorm.config';
import { AuthModule } from './modules/auth-bearer/auth.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validationSchema: schemaValidConfig,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    //TODO migration
    // dataSourceFactory: async (options) => {
    //   const dataSource = await new DataSource({ ...options }).initialize();
    //   return dataSource;
    // },
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {}
