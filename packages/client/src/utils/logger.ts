type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LoggerOptions {
  prefix?: string
  enabled?: boolean
}

const LOG_COLORS: Record<LogLevel, string> = {
  debug: '#8B8B8B',
  info: '#2196F3',
  warn: '#FF9800',
  error: '#F44336',
}

class Logger {
  private prefix: string
  private enabled: boolean

  constructor(options: LoggerOptions = {}) {
    this.prefix = options.prefix || 'App'
    this.enabled = options.enabled ?? import.meta.env.DEV
  }

  private log(level: LogLevel, ...args: unknown[]) {
    if (!this.enabled)
      return

    const timestamp = new Date().toLocaleTimeString()
    const color = LOG_COLORS[level]
    const levelLabel = level.toUpperCase().padEnd(5)

    console[level === 'debug' ? 'log' : level](
      `%c[${this.prefix}] %c${levelLabel} %c${timestamp}`,
      `color: ${color}; font-weight: bold`,
      `color: ${color}`,
      'color: #999',
      ...args,
    )
  }

  debug(...args: unknown[]) {
    this.log('debug', ...args)
  }

  info(...args: unknown[]) {
    this.log('info', ...args)
  }

  warn(...args: unknown[]) {
    this.log('warn', ...args)
  }

  error(...args: unknown[]) {
    this.log('error', ...args)
  }

  // 创建带有特定前缀的子 logger
  child(prefix: string): Logger {
    return new Logger({
      prefix: `${this.prefix}:${prefix}`,
      enabled: this.enabled,
    })
  }
}

// 默认导出一个全局实例
export const logger = new Logger()

// 也导出类，方便创建自定义实例
export { Logger }
