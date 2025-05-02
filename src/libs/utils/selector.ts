export const waitForElement = (
  selector: string,
  timeout: number = 10000
): Promise<NodeListOf<HTMLElement>> => {
  let resolved = true;
  return new Promise((resolve, reject) => {
    let timeoutElement = null;
    timeoutElement = setTimeout(() => {
      resolve(null);
      resolved = false;
    }, timeout);

    if (document.querySelector(selector)) {
      clearTimeout(timeoutElement);
      return resolve(document.querySelectorAll(selector));
    }

    const observer = new MutationObserver(() => {
      if (!resolved) {
        clearTimeout(timeoutElement);
        reject("element not found");
        return;
      }

      if (document.querySelector(selector)) {
        clearTimeout(timeoutElement);

        observer.disconnect();
        resolve(document.querySelectorAll(selector));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
};

export function sleep(timeout: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}
