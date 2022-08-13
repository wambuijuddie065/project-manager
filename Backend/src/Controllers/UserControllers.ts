import { Request, Response } from "express";
import mssql from "mssql";
import { v4 as uid } from "uuid";
import { sqlConfig } from "../Config/Config";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Data, User } from "../Interfaces/interfaces";
import { UserSchemaLog, UserSchemaReg } from "../Helpers/UserValidator";
import jwt from "jsonwebtoken";
dotenv.config();

interface Extended extends Request{
    info?:Data
}

interface ExtendedRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  };
}

export const registerUser = async (req: ExtendedRequest, res: Response) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const id = uid();
    const { name, email, password } = req.body;
    const { error, value } = UserSchemaReg.validate(req.body);
    if (error) {
      res.json({ error: error.details[0].message });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool
      .request()
      .input("id", mssql.VarChar, id)
      .input("name", mssql.VarChar, name)
      .input("email", mssql.VarChar, email)
      .input("password", mssql.VarChar, hashedPassword)
      .execute("insertUser");

    res.json({ message: "User Registered Successfully" });
  } catch (error: any) {
    res.json({ error });
  }
};

export const loginUser = async (req: ExtendedRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    const pool = await mssql.connect(sqlConfig);

    const { error, value } = UserSchemaLog.validate(req.body);
    if (error) {
      res.json({ error: error.details[0].message });
    }

    const user:User[] = await (
      await pool
        .request()
        .input("email", mssql.VarChar, email)
        .execute("getUser")
    ).recordset

    if (!user[0]) {
      res.json({ message: "User Not Found" });
    }else{ 
        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) {
           res.json({ message: 'Invalid Password!' });
        }
        const payload = user.map((item) => {
          const { password, ...rest } = item;
          return rest;
        });
        const token = jwt.sign(payload[0], process.env.KEY as string, {
          expiresIn: "3600s",
        });
        res.json({ message: "User logged in Successfully!",token });}
 
   
  } catch (error) {
    res.json({ error });
  }
};
export const getHomepage=async (req:Extended,res:Response)=>{
    if (req.info) {
        res.json({message:`Dear ${req.info.email} Welcome to the homepage!!`})
        
    }
    
}
export const checkUser= async (req:Extended, res:Response)=>{
  if(req.info){
    res.json({name:req.info.name, role:req.info.role})
  }
}