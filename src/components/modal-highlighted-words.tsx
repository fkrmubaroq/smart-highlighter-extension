import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

export default function ModalHighlightedWords({ show, onHide }: { show:boolean; onHide:() => void}){
    return  <Dialog open={show} onOpenChange={onHide}>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Share link</DialogTitle>
        <DialogDescription>
          Anyone who has this link will be able to view this.
        </DialogDescription>
      </DialogHeader>     
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
}