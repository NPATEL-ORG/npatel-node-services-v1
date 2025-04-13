import dotenv from'dotenv'
dotenv.config()

const databaseConfig = {
    poolConfig: {
        user: process.env.PDB_USER,
        password: process.env.PDB_PASSWORD,
        host: process.env.PDB_HOST,
        port: process.env.PDB_PORT,
        database: process.env.PDB_DB_NAME
    },
    schemaName: 'pichub_dev_v1',
    psqlFunction_signup: 'insert_user_details',
    psqlFunction_login: 'get_password_login_by_email',
    psqlFunction_getUserDetail: 'get_user_detail_by_email',
    psqlFunction_getUserList: 'get_user_list',
    psqlFunction_verifyEmail: 'verify_user',
    psqlFunction_insertNewImage: 'insert_image_details',
    psqlFunction_getImageList: 'get_image_list',
    psqlFunction_uploadComplete: 'upload_complete',
}

export default databaseConfig