import { adminList } from "../configs/admins-config.js"
import databaseConfig from "../configs/database-config.js"

export const addNewUserModel = ({
    username,
    email,
    firstName,
    lastName,
    hashedPassword
}) => {
    return {
        poolConfig: databaseConfig.poolConfig,
        params: [username, adminList.includes(username) ? 1 : 2, hashedPassword, firstName, lastName, email],
        schemaName: databaseConfig.schemaName,
        sqlFunctionName: databaseConfig.psqlFunction_signup
    }
}

export const getUserListModel = ({
    searchKey,
    limit,
    offset
}) => {
    return {
        poolConfig: databaseConfig.poolConfig,
        schemaName: databaseConfig.schemaName,
        sqlFunctionName: databaseConfig.psqlFunction_getUserList,
        params: [ searchKey, limit, offset ]
    }
}