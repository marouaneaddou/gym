

export type Config = {
    port                :   number,
    databaseUrl         :   string,
    nodeEnv             :   'development' | 'production' | 'test',
    jwt_secret          :   string,
    open                :   string,
    closed              :   string,
    capacity_basic      :   number,
    capacity_vip        :   number,
    slotDuration        :   number,
}

// Errors
export type CustomError = Error & {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
};