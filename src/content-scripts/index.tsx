import BtnBookmark from "@/components/button/btn-bookmark";
import SheetHighlightedWords from "@/components/sheet-highlighted-words";
import { useModal } from "@/libs/hooks";
import { removeComponent } from "@/libs/utils/remove";
import { renderComponent } from "@/libs/utils/render";
import "../styles/main.css";

const tolerance = 25;
const Component = ({ coordinate, highlightedText }: { coordinate: { x: number; y: number; }; highlightedText: string; }) => {
    const { show, hideModal, modalName, showModal, data: dataModal } = useModal<"sheet-highlighted-words", string>();

    console.log("show", show, modalName)
    return <>
        {show && <>
            {modalName === "sheet-highlighted-words" && <SheetHighlightedWords show onHide={hideModal}/>}
        </>
        }
        <BtnBookmark
            onClick={() => {
                showModal("sheet-highlighted-words", highlightedText)
            
            }}
            style={{
                left: `${coordinate.x}px`,
                top: `${coordinate.y - tolerance}px`,
            }} />
    </>
}

document.addEventListener('mouseup', (e) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const selectedText = selection.toString().replaceAll(/\s+/g, " ");
    const isContainAppSelector = (e.target as HTMLElement).closest(`#${process.env.APP_SELECTOR}`);
    console.log("x", isContainAppSelector)
    if(isContainAppSelector) return;
    if (!selectedText.length) {
        removeComponent(`#${process.env.APP_SELECTOR}`)
        return;
    }
    
    const rect = range.getBoundingClientRect();
    const coordinate = {
        x: rect.left,
        y: rect.top
    }
    console.log("e ", e , rect)
    renderComponent(<Component coordinate={coordinate} highlightedText={selectedText} />, process.env.APP_SELECTOR)
})
