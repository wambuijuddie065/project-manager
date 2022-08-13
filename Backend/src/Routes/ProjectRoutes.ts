import { Router } from "express";
import { deleteProject, getProject, getProjects, insertProject, updateProject } from "../Controllers/ProjectControllers";
const routerP=Router()


routerP.post('/add',insertProject)//insertProject
routerP.post('/')//asignProject
routerP.get('/:id',getProject)//getProject
routerP.get('/',getProjects)//getProjects
routerP.patch('/:id',updateProject)//updateProject
routerP.delete('/:id',deleteProject)//deleteProject

export default routerP;