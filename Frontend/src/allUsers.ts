import { User } from "./interfaces/interface"

class allUsers{
    constructor(){
        this.displayUsers()
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
            selectUsers.innerHTML=''

            data.map((user)=>{

                let html= `
               <option value=${user.email}>
                ${user.email}
                </option>
                `

                
                selectUsers.insertAdjacentHTML('beforeend', html)
                
            })

        })
    }
}

const n = new allUsers()