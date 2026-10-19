import pino from 'pino'
import type { Env } from '../config/env.ts'

export function createLogger(env: Pick<Env, 'NODE_ENV' | 'LOG_LEVEL'>) {
  return pino({
    level: env.NODE_ENV === 'test' ? 'silent' : env.LOG_LEVEL,
    transport:
      env.NODE_ENV === 'development'
        ? { target: 'pino-pretty', options: { colorize: true, translateTime: 'HH:MM:ss' } }
        : undefined,
  })
}

export type Logger = ReturnType<typeof createLogger>
