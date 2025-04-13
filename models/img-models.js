import databaseConfig from "../configs/database-config.js"

export const addNewImage = ({
    imageName,
    imagePath,
    uploadedBy,
    description,
    tastes
}) => {
    return {
        poolConfig: databaseConfig.poolConfig,
        params: [imageName, imagePath, uploadedBy, description, tastes],
        schemaName: databaseConfig.schemaName,
        sqlFunctionName: databaseConfig.psqlFunction_insertNewImage
    }
}

export const imageUploaded = ({
    imageId
}) => {
    return {
        poolConfig: databaseConfig.poolConfig,
        params: [imageId],
        schemaName: databaseConfig.schemaName,
        sqlFunctionName: databaseConfig.psqlFunction_uploadComplete
    }
}

export const getImageList = ({
    searchKey,
    limit,
    offset
}) => {
    return {
        poolConfig: databaseConfig.poolConfig,
        params: [searchKey, limit, offset],
        schemaName: databaseConfig.schemaName,
        sqlFunctionName: databaseConfig.psqlFunction_getImageList
    }
}
