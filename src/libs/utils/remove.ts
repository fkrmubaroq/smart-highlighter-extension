export function removeComponent(selector:string){
    const el = document.querySelector(selector);
    if(!el) return;
    el.remove();
}