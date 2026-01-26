import ShareSection from "@/components/share/ShareSection";
import { cn } from "@/lib/utils";

type PublicationShareProps = {
  title?: string;
  className?: string;
  compact?: boolean;
};

export default function PublicationShare({ title = "Поделиться публикацией", className, compact }: PublicationShareProps) {
  return (
    <ShareSection
      title={title}
      className={cn(compact && "md:flex-row md:items-center md:justify-between md:gap-4", className)}
    />
  );
}
