
import { Project, User } from "./interfaces/interface"


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
const message= document.querySelector('.message') as HTMLParagraphElement
const selector = document.getElementById('selector') as HTMLSelectElement


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



 export class Projects{
    static getProject(){
        return new Projects()
    }
    constructor(){
      this.displayProject()
      this.displayUsers()
      
    }
    addProject(project_name:string,project_description:string,due_date:String,email:string){
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
                    "due_date":due_date,
                    "email":email

                })
            }).then(res=>{resolve(res.json())}).catch(err=>(reject(err)))
        })
        prom.then((data)=>{
            
            data.message? message.textContent=data.message:''
            data.error? message.textContent=data.error:''
            setTimeout(()=>{  
                message.style.display="none"
             },3000)

            this.displayProject()
        }
        
        
        ).catch(err=>console.log(err))

    }
    displayProject(){
        const token=localStorage.getItem('token') as string;
        const prom=new Promise<Project[]>((resolve,reject)=>{
            fetch('http://localhost:5000/projects',{
                headers:{
                    token
                },
                method:'GET',


            }).then(res=>{resolve(res.json())}).catch(err=>(reject(err)))

        })
        prom.then((data)=>{
       console.log(data);
       
        projectContainer.innerHTML=''
        data.map((item) =>{


            const aProject=document.createElement('div')
            aProject.classList.add('aProject')
            const title=document.createElement('p')
            title.classList.add('title') 
            const desc=document.createElement('p')
            desc.classList.add('desc')
            const due=document.createElement('p')
            due.classList.add('due')
            const assignedUser=document.createElement('p')
            assignedUser.classList.add('assignedUser')
            const deleteProject=document.createElement('button')
            deleteProject.classList.add('deleteProject')
            

            title.textContent=`${item.project_name}`
            desc.textContent=`${item.project_description}`
            due.textContent=` DUE AT:${item.due_date}`
            deleteProject.textContent='DELETE'
            assignedUser.textContent='ASSIGNED'
            // assignProject.textContent='ASSIGN'
            

            aProject.appendChild(title);
            aProject.appendChild(desc);
            aProject.appendChild(due);
            aProject.appendChild(assignedUser);
            aProject.appendChild(deleteProject)
            // aProject.appendChild(assignProject);


            projectContainer.appendChild(aProject);
            deleteProject.addEventListener('click',()=>{                
                this.deleteProject(item.project_id);
            })

            })
              

        })
    }
    displayUsers(){
        const prom=new Promise<User[]>((resolve, reject) => {
            fetch('http://localhost:5000/users',{
                method:'GET',


            }).then(res=>{resolve(res.json())}).catch(err=>(reject(err)))

        })
        prom.then((data)=>{
            const selectUsers=document.getElementById('selectUsers') as HTMLDivElement
            
            // usersContainer.innerHTML=''
            selector.innerHTML=''

            data.map((user)=>{

                let html= `
               <option value=${user.email}>
                ${user.email}
                </option>
                `

                
                selector.insertAdjacentHTML('beforeend', html)
                
            })

        })
    }
    deleteProject(id:string){
        
        const prom=new Promise((resolve, reject)=>{
            fetch('http://localhost:5000/projects/'+id,{
                method: 'DELETE',
            }).then(res=>{resolve(res.json())}).catch(err=>(reject(err)))

        })
        prom.then((data)=>{
            console.log(data);
            this.displayProject()
            
        })

    }

    
}


const p = new Projects()

addProjectBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    
        const title=projectTitle.value
         const description=projectDescription.value 
        const dueDate=projectDueDate.value
        const email=selector.value

       
        

        if (title==''||description==''||dueDate=='') {
            console.log('please fill in all required fields');
            
            
        } else {
          Projects.getProject().addProject(title, description, dueDate,email)  
        }


 
   
})
logoutBtn.addEventListener('click', ()=>{ 
    location.href = 'index.html';
})



