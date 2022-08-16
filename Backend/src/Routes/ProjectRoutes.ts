import { Router } from "express";
import { assignNewProject, deleteProject, getProject, getProjects, getUserProject, insertProject, updateProject } from "../Controllers/ProjectControllers";
const routerP=Router()


routerP.post('/add',insertProject)//insertProject
routerP.post('/')//asignProject
routerP.get('/:id',getProject)//getProject
routerP.get('/',getProjects)//getProjects
routerP.put('/:id',updateProject)//updateProject
routerP.delete('/:id',deleteProject)//deleteProject
routerP.post('/assignProject',assignNewProject)//assignNewProject
routerP.get('/:id/getone',getUserProject)

export default routerP;