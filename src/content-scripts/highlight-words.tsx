import BtnBookmark from "@/components/button/btn-bookmark";
import SheetHighlightedWords from "@/components/sheet-highlighted-words";
import { useShow } from "@/libs/hooks";
import { BACKGROUND_ACTIONS_ENUM } from "@/libs/variables/actions";
import "@/styles/main.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Toaster } from 'react-hot-toast';


const tolerance = 25;
export const HighlightWords = () => {
    const { isShow, hideDisplay, displayName, showDisplay, data: dataShow } = useShow<"sheet-highlighted-words" | "btn-bookmark", string>();
    const [selectedText, setSelectedText] = useState("");
    const btnRef = useRef<HTMLDivElement>(null);
    const listener = useCallback((e: any) => {
        const selection = window.getSelection();
        const selectedText = selection.toString().replaceAll(/\s+/g, " ");
        if (displayName === "sheet-highlighted-words") return
        if (!selectedText.length) {
            hideDisplay();
            return;
        }

        const coordinate = {
            x: e.pageX,
            y: e.pageY - 10
        }
        flushSync(() => {
            showDisplay("btn-bookmark");
            setSelectedText(selectedText);
        })
        btnRef.current.style.left = `${coordinate.x}px`;
        btnRef.current.style.top = `${coordinate.y - tolerance}px`;
    }, [displayName])

    useEffect(() => {
        document.addEventListener('mouseup', listener)

        return () => {
            document.removeEventListener('mouseup', listener)
        }
    }, [displayName])


    useEffect(() => {
        chrome.runtime.onMessage.addListener((message) => {
            if (message.action === BACKGROUND_ACTIONS_ENUM.HighlightedText) {
                showDisplay("sheet-highlighted-words", message.text);
            }
        })

    }, [])

    return <>
        <Toaster containerStyle={{ zIndex: "99999999999999" }} position="bottom-right" />
        <SheetHighlightedWords selectedText={selectedText} show={displayName === "sheet-highlighted-words"} onHide={hideDisplay} />
        {isShow &&
            <>
                {displayName === "btn-bookmark" &&
                    <BtnBookmark
                        ref={btnRef}
                        onClick={() => {
                            showDisplay("sheet-highlighted-words")
                        }}
                    />
                }
            </>
        }

    </>
}