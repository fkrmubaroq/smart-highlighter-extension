import { PortalProvider } from '@/libs/contexts/portal-context';
import { debounce } from '@/libs/utils/optimize';
import '@webcomponents/webcomponentsjs/webcomponents-bundle';
import { createRoot } from "react-dom/client";
import { HighlightWords } from './highlight-words';

class SmartHighlighter extends HTMLElement {
    stylesUrl: string = chrome.runtime.getURL('styles.css');
    portalContainer: HTMLElement | null = null;
    reactRootEl: HTMLElement | null = null;

    constructor() {
        super();
    }

    connectedCallback() {
        this.registerContainers();
        this.appendStyling().then(() => {
            if (!this.reactRootEl) return
            const root = createRoot(this.reactRootEl);
            root.render(
                <PortalProvider container={this.portalContainer!}>
                    <HighlightWords />
                </PortalProvider>
            );

        });
    }

    registerContainers() {
        this.portalContainer = document.createElement("div");
        this.portalContainer.id = "portal-container";
        this.appendChild(this.portalContainer);

        this.reactRootEl = document.createElement("div");
        this.reactRootEl.id = "react-root";
        this.appendChild(this.reactRootEl);
    }

    appendStyling() {
        return fetch(this.stylesUrl)
            .then(response => response.text())
            .then(cssText => {
                const styleEl = document.createElement("style");
                styleEl.textContent = cssText;
                this.prepend(styleEl);
            });
    }
}

customElements.define("smart-highlighter", SmartHighlighter);
const element = document.createElement("smart-highlighter");
document.documentElement.insertBefore(element, document.body.nextSibling);



const mark = ["Hello", "end"];
const highlightClass = "highlighted-word";


// Fungsi untuk menyoroti kata di dalam teks node
function highlightWordsInTextNode(node: Text) {
    let text = node.textContent || '';
    mark.forEach((word) => {
      const regex = new RegExp(`(${word})`, 'gi');
      text = text.replace(regex, `<mark class="highlighted">$1</mark>`);
    });
    if (node.textContent !== text) {
      const span = document.createElement('span');
      span.innerHTML = text;
      node.replaceWith(span);
    }
  }
  
  // Fungsi untuk menelusuri semua node di dalam elemen dan highlight kata
  function traverseAndHighlight(element: Node) {
    if (element.nodeType === Node.TEXT_NODE) {
      highlightWordsInTextNode(element as Text);
    }
    
    console.log("element ", element)
    // Proses anak-anak node secara rekursif
    element.childNodes.forEach((childNode) => {
      traverseAndHighlight(childNode);
    });
  }

const debounceCallback = debounce(() => traverseAndHighlight(document.body))

const observer = new MutationObserver(debounceCallback);
