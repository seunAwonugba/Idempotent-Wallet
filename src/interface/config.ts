export interface DatabaseConfig {
    username: string | undefined;
    password: string | undefined;
    database: string | undefined;
    host: string | undefined;
    dialect: string | undefined;
    ssl?: boolean;
    dialectOptions?: {
        ssl: {
            require: boolean;
            rejectUnauthorized: boolean;
        };
        native: boolean;
    };
}
