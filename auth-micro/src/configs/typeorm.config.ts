import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    autoLoadEntities: true,
    database: configService.get<string>('POSTGRES_DATABASE'),
    entities: [__dirname + '/../modules/**/*.entity.{ts,js}'],
    host: configService.get<string>('POSTGRES_HOST'),
    migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
    migrationsTableName: 'custom_migration_table',
    password: configService.get<string>('POSTGRES_PASSWORD'),
    port: configService.get<number>('POSTGRES_PORT'),
    subscribers: [__dirname + '/../subscribers/**/*{.ts,.js}'],
    synchronize: false,
    type: 'postgres',
    username: configService.get<string>('POSTGRES_USERNAME'),
  }),
};
