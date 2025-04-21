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

type TuseModal<TModalName> = {
  show?: boolean;
  modalName?: TModalName;
};

export function useModal<TModalName, TData = unknown>(initialOptions?: TuseModal<TModalName>) {
  const [currentShow, setCurrentShow] = useState(initialOptions?.show || false);
  const [name, setName] = useState<TModalName | undefined>(
    initialOptions?.modalName || undefined
  );
  const [data, setData] = useState<TData | null>(null);

  const hideModal = () => {
    setCurrentShow(false);
    setName(undefined);
    // Remove modal-open class from body
    document.body.classList?.remove("modal-open");
  };

  const showModal = (modalName: TModalName, data?: TData) => {
    setName(modalName);
    setCurrentShow(true);
    data && setData(data);
  };

  return {
    data,
    modalName: name,
    showModal,
    show: currentShow,
    hideModal,
  };
}
