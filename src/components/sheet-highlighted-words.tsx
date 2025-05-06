import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import clsx from "clsx";
import { CheckIcon, PencilIcon, XIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export default function SheetHighlightedWords({ selectedText, show, onHide }: { selectedText: string; show: boolean; onHide: () => void }) {
  return <Sheet open={show} onOpenChange={onHide}>
    <SheetContent className="twe-mt-5 twe-mb-5 twe-mr-3 twe-max-h-[94vh] twe-rounded-md twe-w-[350px]">
      <SheetHeader>
        <SheetTitle>Highlighted Text</SheetTitle>
        <SheetDescription>
          <HighlightedText text={selectedText} />
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
}

function HighlightedText({ text }: { text: string }) {
  const [editable, setEditable] = useState(false);
  const [currentText, setCurrentText] = useState(text);
  const [description, setDescription] = useState("");
  const onClose = () => setEditable(false);

  const onSave = (updatedText: string) => {
    setEditable(false);
    setCurrentText(updatedText)
    toast.success(`Text updated ${updatedText}`)
  }

  return <div className="twe-flex twe-flex-col twe-gap-y-3">
    <div>
      <Label>Text</Label>
      <div className="flex twe-relative twe-items-center twe-justify-between twe-py-2 twe-pr-8 twe-pl-2 twe-shadow-md twe-rounded-md border">
        {
          editable ?
            <EditableText
              onClose={onClose}
              onSave={onSave}
              text={currentText}
            /> :
            <em className="twe-break-all twe-not-italic twe-p-[3px] twe-rounded-sm twe-bg-primary twe-text-white">{currentText}</em>
        }
        <div className={clsx("twe-absolute twe-right-3 twe-top-1/2 twe-cursor-pointer", !editable && "-translate-y-1/2")} onClick={() => {
          setEditable(true)
        }}>
          <PencilIcon size={12} />
        </div>
      </div>
    </div>

    <div>
      <Label>Description</Label>
      <Textarea
        placeholder="Description here"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
    </div>

    <div className="twe-justify-end">
      <Button className="w-full">Save</Button>
    </div>
  </div>

}

function EditableText({ text, onClose, onSave }: {
  text: string;
  onClose: () => void;
  onSave: (text: string) => void;
}) {
  const [currentText, setCurrentText] = useState(text);

  return <div className="twe-relative twe-w-full">
    <Textarea value={currentText} className="twe-resize-none focus:!twe-ring-transparent twe-bg-transparent twe-pb-8 twe-h-[150px] twe-border-none" onChange={e => setCurrentText(e.target.value)} />
    <div className="twe-absolute twe-bottom-[8px] twe-right-[7px]">
      <Button
        size="sm"
        variant="ghost"
        onClick={() => onClose()}
      >
        <XIcon size={12} />
      </Button>
      <Button
        size="sm"
        onClick={() => onSave(currentText)}
      >
        <CheckIcon size={12} />
      </Button>
    </div>
  </div>
}