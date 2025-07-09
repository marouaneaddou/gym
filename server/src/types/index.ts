

export type Config = {
    port                :   number,
    databaseUrl         :   string,
    nodeEnv             :   'development' | 'production' | 'test',
}

// Errors
export type CustomError = Error & {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
};