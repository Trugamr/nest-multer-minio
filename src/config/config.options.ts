import { ConfigModuleOptions } from '@nestjs/config';
import { z } from 'zod';

const schema = z.object({
  PORT: z.preprocess((port) => parseInt(z.string().parse(port)), z.number()),
  S3_HOST: z.string(),
  S3_PORT: z.preprocess((port) => parseInt(z.string().parse(port)), z.number()),
  S3_BUCKET: z.string(),
  S3_ACCESS_KEY: z.string(),
  S3_SECRET_KEY: z.string(),
  S3_REGION: z.string().default('local'),
});

export type EnvironmentVariables = z.infer<typeof schema>;

export function getConfigOptions(): ConfigModuleOptions {
  return {
    isGlobal: true,
    validate: (config) => schema.parse(config),
  };
}
