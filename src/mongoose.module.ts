import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // Get the database URL from environment variables via configService
        const databaseUrl = configService.get<string>('DATABASE_URL');

        console.log('DATABASE_URL from configService:', databaseUrl);
        console.log('DATABASE_URL from process.env:', process.env.DATABASE_URL);

        if (!databaseUrl) {
          throw new Error(
            'DATABASE_URL is not defined in environment variables',
          );
        }

        return {
          uri: databaseUrl,
        };
      },
    }),
  ],
  exports: [MongooseModule],
})
export class MongooseConfigModule {}
