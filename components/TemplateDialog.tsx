import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/lib/portableTextComponents";

type Template = {
  title: string;
  slug: string;
  about?: unknown; // Portable Text block content
  [key: string]: unknown;
};

export default function TemplateDialog({
  template,
  variant = "button",
}: {
  template: Template;
  variant?: "button" | "link";
}) {
  if (!template || !template.about) return null;
  return (
    <Dialog>
      <DialogTrigger asChild>
        {variant === "link" ? (
          <span className="cursor-pointer hover:text-white transition-colors">
            About Template
          </span>
        ) : (
          <Button variant="outline" className="text-sm">
            About Template
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto rounded-[30px] bg-black/80 backdrop-blur-sm  border border-[#262626]">
        <DialogHeader className="border-b border-[#262626] pb-4">
          <DialogTitle className="text-base text-white">
            About {template.title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2 text-sm leading-snug text-white/70">
          {template.about && (
            <PortableText
              // @ts-expect-error - PortableText accepts block content arrays
              value={template.about}
              components={portableTextComponents}
            />
          )}
        </div>
        <DialogFooter className="flex flex-row-reverse gap-2">
          <DialogClose asChild>
            <Button size="sm">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
