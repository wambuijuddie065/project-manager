import { Projects } from "./admin"


const loginEmail=document.getElementById("loginEmail") as HTMLInputElement
const loginPassword=document.getElementById("loginPassword")as HTMLInputElement
const registerEmail=document.getElementById("registerEmail") as HTMLInputElement
const registerName=document.getElementById("registerName")as HTMLInputElement
const registerPassword=document.getElementById("registerPassword")as HTMLInputElement
const registerBtn=document.getElementById("registerBtn") as HTMLButtonElement
const loginBtn=document.getElementById("loginBtn") as HTMLButtonElement
const loginPage=document.getElementById("loginPage") as HTMLLinkElement
const signupPage=document.getElementById("signupPage") as HTMLLinkElement
const registerContainer=document.querySelector('.registerContainer') as HTMLDivElement
const loginContainer=document.querySelector('.loginContainer') as HTMLDivElement


function displaySignup(){
    registerContainer.style.display="block";
    loginContainer.style.display="none"
}

function displayLogin(){
    registerContainer.style.display="none";
    loginContainer.style.display="flex"
}

loginPage.addEventListener('click',()=>{
    displayLogin()
})
signupPage.addEventListener('click',()=>{
    displaySignup()
})


class Users{
    static getUser(){
        return new  Users()
    }
    constructor(){}
    loginUser(email:string,password:string){
        const prom=new Promise<{error?:string,token?:string,message?:string}>((resolve,reject)=>{
            // console.log('email received',email);
            
            fetch('http://localhost:5000/users/login',{
                headers:{
                    'Accept':'Application/json',
                    'Content-Type':'Application/json'
                },
                method:"POST",
                body:JSON.stringify({
                    "email":email,
                    "password":password })


            }).then(res=>{resolve(res.json())}).catch(err=>{reject(err)})

        })
        prom.then(data=>{
            data.token?localStorage.setItem('token',data.token):''
            console.log(data);
            this.redirect()
            
        }).catch(err=>console.log(err))

    }
    registerUser(name:string,email:string,password:string){
        const prom=new Promise<{error?:string,message?:string}>((resolve,reject)=>{
            fetch('http://localhost:5000/users/register',{
                headers:{
                    'Accept':'Application/json',
                    'Content-Type':'Application/json'
                },
                method:"POST",
                body:JSON.stringify({
                    "name":name,
                    "email":email,
                    "password":password })
            }).then(res=>{resolve(res.json())}).catch(err=>(reject(err)))
        })
        prom.then(data=>console.log(data)).catch(err=>console.log(err))
    }

    redirect(){
        const token=localStorage.getItem('token') as string;
        new Promise<{name:string,role:string}>((resolve,reject)=>{
            fetch('http://localhost:5000/users/check',{
                headers:{
                    'Accept':'Application/json',
                    'Content-Type':'Application/json',
                    'token':token

                },
                method:'GET'

            }).then(res=>(resolve(res.json()))).catch(err=>(reject(err)))

        }).then(data=>{
            console.log(data);
            localStorage.setItem('name',data.name)
            if(data.role==='Admin'){
                location.href='AdminDashboard.html'
                
            }else{
                   location.href='UserDashboard.html'
            }
        }
        )
    }
}


loginBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const emailInput=loginEmail.value
    const passwordInput=loginPassword.value

    if (emailInput==''|| passwordInput=='') {

        console.log("Please fill in all the fields");
        
        
    }else{
        Users.getUser().loginUser(emailInput,passwordInput)

        // console.log(emailInput,passwordInput);
        
    }

})


registerBtn.addEventListener('click',(e)=>{
    e.preventDefault()

    const nameInput=registerName.value
    const emailInput=registerEmail.value
    const passwordInput=registerPassword.value

    if (nameInput==''|| passwordInput==''||emailInput=='') {

        console.log("Please fill in all the fields");
        
        
    }else{
        Users.getUser().registerUser(nameInput,emailInput,passwordInput)
    }

})
