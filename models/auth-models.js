import databaseConfig from "../configs/database-config.js";

export const loginWithEmailModel = (email) => {
    return {
        schemaName: databaseConfig.schemaName,
        sqlFunctionName: databaseConfig.psqlFunction_login,
        poolConfig: databaseConfig.poolConfig,
        params: [email]
    }
}

export const getUserDetailByEmailModel = (email) => {
    return {
        schemaName: databaseConfig.schemaName,
        sqlFunctionName: databaseConfig.psqlFunction_getUserDetail,
        poolConfig: databaseConfig.poolConfig,
        params: [email]
    }
}