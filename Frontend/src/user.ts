const profName=document.getElementById('profileName') as HTMLParagraphElement

 const namesUser=localStorage.getItem('name')

 if(namesUser){
   profName.textContent=` Bonjour ${namesUser}`

 }

 