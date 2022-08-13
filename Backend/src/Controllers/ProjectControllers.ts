import { Request, RequestHandler, Response } from "express";
import mssql from "mssql";
import { v4 as uid } from "uuid"; 
import { sqlConfig } from "../Config/Config";

interface ExtendedRequest extends Request{
    body:{
        project_name:string
        project_description:string
        due_date:Date
    }
}



export const insertProject=async(req:ExtendedRequest,res:Response)=>{
    try {
        const pool=await mssql.connect(sqlConfig)
        const id=uid()
        const {project_name,project_description,due_date}=req.body
        await pool
        .request()
        .input("project_id", mssql.VarChar, id)
        .input("project_name", mssql.VarChar, project_name)
        .input("project_description", mssql.VarChar, project_description)
        .input("due_date", mssql.VarChar, due_date)
        .execute("insertProject");
  
      res.json({ message: "Project Added Successfully" });

        
    } catch (error:any) {
        res.json({error})
        
    }
}


export const getProject: RequestHandler<{id: string }> = async (req, res) => {
    try {
      const id = req.params.id
      const pool = await mssql.connect(sqlConfig);
      const projects = await pool
        .request()
        .input("project_id", mssql.VarChar, id)
        .execute("getProject");
      const { recordset } = projects;
  
      if (!projects.recordset[0]) {
        res.json({ message: "Project Not Found" });
      } else {
        res.json(recordset);
       
      }
      
    } catch (error: any) {
      res.json({ error });
    }
  };


  export const updateProject: RequestHandler<{ id: string }> = async (req,res ) => {
    try {
      const id = req.params.id;
      const { project_name,project_description,due_date,is_complete,isassigned } = req.body as {
        project_name:string
        project_description:string
        due_date:string
        is_complete:string
        isassigned:string
      };
      const pool = await mssql.connect(sqlConfig);
      const projects = await pool
        .request()
        .input("project_id", mssql.VarChar, id)
        .execute("getProject");
  
      const { recordset } = projects;
      if (!projects.recordset[0]) {
        res.json({ message: "Project Not Found!" });
      } else {
        await pool.request()
        .input("project_id", mssql.VarChar, id)
        .input("project_name", mssql.VarChar, project_name)
        .input("project_description", mssql.VarChar, project_description)
        .input("due_date", mssql.VarChar, due_date)
        .input("is_complete", mssql.VarChar, is_complete)
        .input("isassigned", mssql.VarChar, isassigned)
        .execute("updateProject");
        res.json({
          message: "Project updated successfully!",
        });
      }
    } catch (error: any) {
      res.json({ error });
    }
  };

export const getProjects: RequestHandler = async (req, res) => {
    try {
      const pool = await mssql.connect(sqlConfig);
      const projects = await pool.request().execute("getProjects");
      res.json(projects.recordset);
    } catch (error: any) {
      res.json({ Error });
    }
  };

export const deleteProject:RequestHandler<{id:string}>=async (req,res)=>{
    try {
        const id=req.params.id;
        const pool=await mssql.connect(sqlConfig);
        const projects=await pool.request()
        .input("project_id", mssql.VarChar, id)
        .execute('getProject')
        const {recordset}=projects;
        if(!projects.recordset[0]) {
            res.json({message:'Project Not Found'})
            
        } else {
            await pool.request()
            .input("project_id", mssql.VarChar, id)
            .execute("deleteProject")
            res.json({message:'Project Deleted Successfully'})
        }
        
    } catch (error:any) {
        res.json({ error });
        
    }
 }