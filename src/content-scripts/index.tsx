import BtnBookmark from "@/components/button/btn-bookmark";
import ModalHighlightedWords from "@/components/modal-highlighted-words";
import { useModal } from "@/libs/hooks";
import { removeComponent } from "@/libs/utils/remove";
import { renderComponent } from "@/libs/utils/render";
import "../styles/main.css";

const tolerance = 25;
const Component = ({ coordinate, highlightedText }: { coordinate: { x: number; y: number; }; highlightedText: string; }) => {
    const { show, hideModal, modalName, showModal, data: dataModal } = useModal<"modal-highlighted-words", string>();

    console.log("show", show, modalName)
    return <>
        {show && <>
            {modalName === "modal-highlighted-words" && <ModalHighlightedWords show onHide={hideModal}/>}
        </>
        }
        <BtnBookmark
            onClick={() => {
                showModal("modal-highlighted-words", highlightedText)
            
            }}
            style={{
                left: `${coordinate.x}px`,
                top: `${coordinate.y - tolerance}px`,
            }} />
    </>
}

document.addEventListener('mouseup', (e) => {
    const selection = window.getSelection();
    const selectedText = selection.toString().replaceAll(/\s+/g, " ");
    const isContainAppSelector = (e.target as HTMLElement).closest(`#${process.env.APP_SELECTOR}`);
    console.log("x", isContainAppSelector)
    if(isContainAppSelector) return;
    if (!selectedText.length) {
        removeComponent(`#${process.env.APP_SELECTOR}`)
        return;
    }

    const target = (e.target as HTMLElement).getBoundingClientRect();
    const coordinate = {
        x: target.x,
        y: target.y
    }
    renderComponent(<Component coordinate={coordinate} highlightedText={selectedText} />, process.env.APP_SELECTOR)
})
