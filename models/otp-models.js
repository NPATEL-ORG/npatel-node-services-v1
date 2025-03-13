import databaseConfig from "../configs/database-config.js"

export const verifyEmailModel = ({
    email,
    verify
}) => {
    return {
        poolConfig: databaseConfig.poolConfig,
        schemaName: databaseConfig.schemaName,
        sqlFunctionName: databaseConfig.psqlFunction_verifyEmail,
        params: [ email, verify ]
    }
}