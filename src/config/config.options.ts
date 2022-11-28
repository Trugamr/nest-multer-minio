import { ConfigModuleOptions } from '@nestjs/config';
import { z } from 'zod';

const schema = z.object({
  PORT: z.preprocess((port) => parseInt(z.string().parse(port)), z.number()),
  S3_ENDPOINT: z.string(),
  S3_BUCKET: z.string(),
  S3_ACCESS_KEY: z.string(),
  S3_SECRET_KEY: z.string(),
});

export type EnvionmentVariables = z.infer<typeof schema>;

export function getConfigOptions(): ConfigModuleOptions {
  return {
    isGlobal: true,
    validate: (config) => schema.parse(config),
  };
}
