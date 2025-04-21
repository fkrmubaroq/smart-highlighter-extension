import { createRoot } from "react-dom/client";

export default function Popup() {

    return (
        <div>
            Hello world
        </div>
    );
}

const rootEl = document.createElement("div");
rootEl.id = process.env.APP_SELECTOR;
document.body.prepend(rootEl);
const root = createRoot(document.getElementById(rootEl.id));
root.render(<Popup />);