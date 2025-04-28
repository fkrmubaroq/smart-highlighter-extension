import { useEffect, useState } from "react";
import { GET_CURRENT_TAB_ID } from "./variables/actions";

export function useGetCurrentTab() {
  const [tabId, setTabId] = useState<chrome.tabs.Tab>();
  const getCurrentTabId = () => {
    chrome.runtime.sendMessage({ actionName: GET_CURRENT_TAB_ID }, setTabId);
  };

  useEffect(() => {
    getCurrentTabId();
  }, []);

  return tabId;
}

type TuseShow<TDisplayName> = {
  show?: boolean;
  displayName?: TDisplayName;
};

export function useShow<TDisplayName, TData = unknown>(initialOptions?: TuseShow<TDisplayName>) {
  const [currentShow, setCurrentShow] = useState(initialOptions?.show || false);
  const [name, setName] = useState<TDisplayName | undefined>(
    initialOptions?.displayName || undefined
  );
  const [data, setData] = useState<TData | null>(null);

  const hideDisplay = () => {
    setCurrentShow(false);
    setName(undefined);
    // Remove modal-open class from body
    // document.body.classList?.remove("modal-open");
  };

  const showDisplay = (displayName: TDisplayName, data?: TData) => {
    setName(displayName);
    setCurrentShow(true);
    data && setData(data);
  };

  return {
    data,
    displayName: name,
    showDisplay,
    isShow: currentShow,
    hideDisplay,
  };
}
