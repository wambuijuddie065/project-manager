import { projectInterface } from "./interfaces/interface"


const projectForm=document.getElementById('projectForm') as HTMLFormElement
const logoutBtn=document.getElementById('logoutBtn') as HTMLButtonElement
const newProjectBtn=document.getElementById('newProjectBtn') as HTMLButtonElement
const closeFormBtn=document.getElementById('closeFormBtn') as HTMLButtonElement
const addProjectBtn=document.getElementById('addProjectBtn') as HTMLButtonElement
const projectTitle=document.getElementById('projectTitle') as HTMLInputElement
const projectDescription=document.getElementById('projectDescription') as HTMLInputElement
const projectDueDate=document.getElementById('projectDueDate') as HTMLInputElement
const projectContainer=document.querySelector('.projectContainer') as HTMLDivElement
const profileName=document.getElementById('profileName') as HTMLParagraphElement




 const names=localStorage.getItem('name')

 if(names){
   profileName.textContent=` Bonjour ${names}`
 }

function showForm() {
	projectForm.style.display='block';
    closeFormBtn.style.display='block';
    newProjectBtn.style.display='none'	
}

newProjectBtn.addEventListener('click',()=>{
    showForm()
})

function closeForm(){
    projectForm.style.display='none';
    closeFormBtn.style.display='none';
    newProjectBtn.style.display='block' 
}
closeFormBtn.addEventListener('click',()=>{
    closeForm()
})



class Projects{
    static getProject(){
        return new Projects()
    }
    constructor(){}
    addProject(project_name:string,project_description:string,due_date:String){
        const prom=new Promise<{error?:string,message?:string}>((resolve,reject)=>{
            fetch('http://localhost:5000/projects/add',{
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                method:"POST",
                body:JSON.stringify({
                    "project_name":project_name,
                    "project_description":project_description,
                    "due_date":due_date

                })
            }).then(res=>{resolve(res.json())}).catch(err=>(reject(err)))
        })
        prom.then(data=>console.log(data)).catch(err=>console.log(err))

    }
}
addProjectBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    
        const title=projectTitle.value
         const description=projectDescription.value 
        const dueDate=projectDueDate.value

        console.log(title, description, dueDate);
        

        if (title==''||description==''||dueDate=='') {
            console.log('please fill in all required fields');
            
            
        } else {
          Projects.getProject().addProject(title, description, dueDate)  
        }


 
   
})


