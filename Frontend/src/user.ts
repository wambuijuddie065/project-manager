import { Project } from "./interfaces/interface"

const logoutBtn=document.getElementById('logoutBtn') as HTMLButtonElement
const profName=document.getElementById('profileName') as HTMLParagraphElement
let myProjectsContainer=document.getElementById('myProjectsContainer') as HTMLDivElement
const projectCount=document.getElementById('projectCount') as HTMLParagraphElement

 const namesUser=localStorage.getItem('name')

 if(namesUser){
   profName.textContent=` Bonjour ${namesUser}`

 }

 logoutBtn.addEventListener('click', ()=>{ 
  location.href = 'index.html';
})
// if (){
//   projectCount.textContent="You have no projects assigned"
// }

window.onload = ()=>{
  const user_id = localStorage.getItem("user_id") as string
  const token = localStorage.getItem("token") as string
  const pro=new myProjects()
  pro.displayAssignedProjects(user_id,token);

}

class myProjects{
  constructor(){
    // this.displayAssignedProjects()
    
  }

  displayAssignedProjects(id:string,token:string){
    const prom=new Promise<Project[]>((resolve,reject)=>{
      fetch(`http://localhost:5000/projects/${id}/getone`,{
        headers:{
          'Accept':'Application/json',
          'Content-Type':'Application/json',
          'token':token

      },
          method:'GET',

      }).then(res=>{resolve(res.json())}).catch(err=>(reject(err)))

  })
  prom.then((data)=>{
 
    myProjectsContainer.innerHTML=''
    data.map((item) =>{


      const aProject=document.createElement('div')
      aProject.classList.add('aProject')
      const title=document.createElement('p')
      title.classList.add('title') 
      const desc=document.createElement('p')
      desc.classList.add('desc')
      const due=document.createElement('p')
      due.classList.add('due')
      // const assignedUser=document.createElement('p')
      // assignedUser.classList.add('assignedUser')
      const completeProject=document.createElement('button')
      completeProject.classList.add('completeProject')
      

      title.textContent=`${item.project_id}`
      desc.textContent=`${item.project_description}`
      due.textContent=`${item.due_date}`
      completeProject.textContent='COMPLETED'
      
      
      

      aProject.appendChild(title);
      aProject.appendChild(desc);
      aProject.appendChild(due);
      aProject.appendChild(completeProject)
     


      myProjectsContainer.appendChild(aProject);
    

      })
        

  })
}

}

