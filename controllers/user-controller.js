import { psqlFunctionCaller, timeLogger } from "spooky-node"
import bcrypt from 'bcrypt'
import dotenv from'dotenv'
import { addNewUserModel, getUserListModel } from "../models/user-models.js"
import { generalResponseModel } from "../models/response-models.js"
dotenv.config()

export const signupUserController = async(req, res) => {
    try {
        timeLogger({ incident: 'User Registration call' })
        console.log( 'user registration initiated with payload :',req.body )
        const hashedPassword = await bcrypt.hash( req.body.password, 10 )
        const newUser = await psqlFunctionCaller( addNewUserModel({
            ...req.body,
            hashedPassword
        }) )
        console.log('Query returns', newUser.rows)
        let statusCode = newUser.rows[0]?.code
        if (statusCode === 2000) {
            res.status(201).json(generalResponseModel({ code: 2106, newUser: newUser.rows[0]}))
        } else {
            res.status(409).json(generalResponseModel({ code: 1109, error: newUser.rows[0]?.msg}))
        }
        timeLogger({incident: 'Query Answered'})
    } catch (error) {
        res.status(500).json(generalResponseModel({code: 1500, error}))
        console.log(error)
        timeLogger({incident: 'Neura returns error'})
    }
}

export const getUserListController = async( req, res ) => {
    try {
        timeLogger({ incident: 'User List requested' })
        const userList = await psqlFunctionCaller( getUserListModel( req.body ) )
        if (userList){
            res.status(200).json(generalResponseModel({ code:2107, userList: userList.rows }))
        }
    } catch (error) {
        res.status(500).json(generalResponseModel({code: 1500, error}))
        console.log(error)
        timeLogger({incident: 'Neura returns error'})
    }
}