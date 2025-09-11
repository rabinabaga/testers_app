import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';

import databaseConfig from './database.config';

import jwtConfig from './jwt.config';

import envConfig from './env.config';

export const appConfigs: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: '.env',
  load: [databaseConfig, jwtConfig, envConfig],
};
