import env from '@config/env';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

export interface LoggerOptions {
  level?: LogLevel;
  namespace?: string;
}

const defaultLevel: LogLevel = env.isProd ? 'info' : 'debug';

function shouldLog(level: LogLevel, currentLevel: LogLevel) {
  return LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[currentLevel];
}

function createPrefix(namespace?: string): string {
  const timestamp = new Date().toISOString();
  return namespace ? `[${timestamp}] [${namespace}]` : `[${timestamp}]`;
}

export class Logger {
  private readonly level: LogLevel;
  private readonly namespace?: string;

  constructor({ level = defaultLevel, namespace }: LoggerOptions = {}) {
    this.level = level;
    this.namespace = namespace;
  }

  private formatMessage(level: LogLevel, message: unknown): unknown[] {
    return [createPrefix(this.namespace), level.toUpperCase(), message];
  }

  debug(...args: unknown[]): void {
    if (shouldLog('debug', this.level)) {
      console.debug(...this.formatMessage('debug', args[0]), ...args.slice(1));
    }
  }

  info(...args: unknown[]): void {
    if (shouldLog('info', this.level)) {
      console.info(...this.formatMessage('info', args[0]), ...args.slice(1));
    }
  }

  warn(...args: unknown[]): void {
    if (shouldLog('warn', this.level)) {
      console.warn(...this.formatMessage('warn', args[0]), ...args.slice(1));
    }
  }

  error(...args: unknown[]): void {
    if (shouldLog('error', this.level)) {
      console.error(...this.formatMessage('error', args[0]), ...args.slice(1));
    }
  }
}

export const logger = new Logger({ namespace: env.appName });

export default logger;
