import React from "react";

const logoUrl = chrome.runtime.getURL('assets/logo/save-word.png');

const BtnBookmark = React.forwardRef<HTMLDivElement, React.ComponentPropsWithRef<"div">>((props, ref) => {
    return <div
        ref={ref}
        role="button"
        className="!twe-absolute twe-p-0.5 hover:twe-bg-gray-200 twe-bg-white twe-rounded-md twe-cursor-pointer twe-shadow-md"
        {...props}
    >
        <img src={logoUrl} className="twe-object-contain twe-w-[18px] twe-h-[18px]" />
    </div>
})

export default BtnBookmark;