import { Router } from "express";
import { checkUser, getHomepage, loginUser, registerUser } from "../Controllers/UserControllers";
import { VerifyToken } from "../Middleware/VerifyToken";
const routerU=Router()


routerU.post('/login',loginUser)
routerU.post('/register',registerUser)
routerU.get('/dashboard',VerifyToken,getHomepage)
routerU.get('/check',VerifyToken,checkUser)


export default routerU