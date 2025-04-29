import { PortalProvider } from "@/libs/contexts/portal-context";
import { createRoot } from "react-dom/client";
import { HighlightWords } from "./highlight-words";


class SmartHighlighter extends HTMLElement {
    stylesUrl: string = chrome.runtime.getURL('styles.css');
    shadowRoot: ShadowRoot;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: "open" });
        const root = createRoot(this.shadowRoot);
        const portalContainer = this.registerPortalContainer();
        this.appendStyling();
        root.render(<PortalProvider container={portalContainer}>
            <HighlightWords />
        </PortalProvider>)
    }

    registerPortalContainer() {
        const portalContainer = document.createElement("div");
        portalContainer.id = "portal-container"
        this.shadowRoot.appendChild(portalContainer);
        return portalContainer;
    }

    appendStyling() {
        return fetch(this.stylesUrl).then(response => response.text())
            .then(cssText => {
                console.log("ress : ", cssText);
                const styleEl = document.createElement("style");
                styleEl.textContent = cssText
                this.shadowRoot.prepend(styleEl);
            })

    }
}

console.log("masuk", customElements, window.customElements)
document.addEventListener("DOMContentLoaded", () => {

});

window.postMessage("INIT_APP", "*")
window.addEventListener("message", (event) => {

    if (event.source !== window) return;
    if (event.data === "INIT_APP") {
        console.log("window z :", window.customElements)
        customElements.define("smart-highlighter", SmartHighlighter);
        const element = document.createElement("smart-highlighter");
        document.body.appendChild(element);
    }
})
// const script = document.createElement("scipt");
// script.src = chrome.runtime