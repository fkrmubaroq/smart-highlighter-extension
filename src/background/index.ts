import { BACKGROUND_ACTIONS_ENUM } from "@/libs/variables/actions";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "highlight-text",
    title: "Highlight this text",
    contexts: ["selection"], 
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "highlight-text") {
    chrome.tabs.sendMessage(tab.id, {
        action:BACKGROUND_ACTIONS_ENUM.HighlightedText,
        text: info.selectionText
    })
  }
});
