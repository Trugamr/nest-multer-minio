import { ConfigModuleOptions } from '@nestjs/config';
import { z } from 'zod';

const schema = z.object({
  PORT: z.preprocess((port) => parseInt(z.string().parse(port)), z.number()),
});

export type EnvionmentVariables = z.infer<typeof schema>;

export function getConfigOptions(): ConfigModuleOptions {
  return {
    isGlobal: true,
    validate: (config) => schema.parse(config),
  };
}
