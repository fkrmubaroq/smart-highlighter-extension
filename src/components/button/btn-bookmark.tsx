const logoUrl = chrome.runtime.getURL('assets/logo/save-word.png');

export default function BtnBookmark(props: React.ComponentPropsWithoutRef<"div">) {
    return <div
        role="button"
        className="!tw-absolute tw-p-0.5 hover:tw-bg-gray-200 tw-bg-white tw-rounded-md tw-cursor-pointer tw-shadow-md"
        {...props}
    >
        <img src={logoUrl} className="tw-object-contain tw-w-[18px] tw-h-[18px]" />
    </div>
}

