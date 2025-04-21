import { JSX } from "react";
import { createRoot } from "react-dom/client";

export function renderComponent(component: JSX.Element, id:string=process.env.APP_SELECTOR){
    let container = document.getElementById(id);
    if(container){
        container.remove();
    }

    container = document.createElement("div");
    container.id = id;
    document.body.appendChild(container);
    const root = createRoot(container!); 
    root.render(component);
}