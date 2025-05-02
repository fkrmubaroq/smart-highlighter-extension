import { PortalProvider } from '@/libs/contexts/portal-context';
import '@webcomponents/webcomponentsjs/webcomponents-bundle';
import { createRoot } from "react-dom/client";
import { HighlightWords } from './highlight-words';

class SmartHighlighter extends HTMLElement {
    stylesUrl: string = chrome.runtime.getURL('styles.css');

    constructor() {
        super();
        const root = createRoot(this);
        const portalContainer = this.registerPortalContainer();
        this.appendStyling();
        root.render(<PortalProvider container={portalContainer}>
            <HighlightWords />
        </PortalProvider>);
        document.documentElement.insertBefore(this, document.body.nextSibling);
    }

    connectedCallback() {
        console.log("xxx")
    }

    registerPortalContainer() {
        const portalContainer = document.createElement("div");
        portalContainer.id = "portal-container"
        this.appendChild(portalContainer);
        return portalContainer;
    }

    appendStyling() {
        return fetch(this.stylesUrl).then(response => response.text())
            .then(cssText => {
                const styleEl = document.createElement("style");
                styleEl.textContent = cssText
                this.prepend(styleEl);
            })

    }
}

customElements.define("smart-highlighter", SmartHighlighter);
const element = document.createElement("smart-highlighter");
