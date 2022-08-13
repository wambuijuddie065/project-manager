import { projectInterface } from "./interfaces/interface.js"



export const renderProject = (data: projectInterface[])=> {

    return data.
    map((item)=>`
    <div class="aProject">
        <div class="title">${item.title}</div>
        <div class="desc">${item.description}</div>
        <div class="due">${item.date}</div>
        <button id="deleteProject">DELETE</button>
        <button id="assignProject">ASSIGN</button>
    </div>`)
    .join("")
    }