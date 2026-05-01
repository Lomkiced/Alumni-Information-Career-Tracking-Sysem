// components/shared/PageHeader.tsx
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, icon: Icon, children, className }: PageHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4 mb-6", className)}>
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Icon size={20} className="text-primary" />
          </div>
        )}
        <div>
          <h1 className="font-heading text-xl font-bold text-foreground">{title}</h1>
          {description && <p className="text-muted-foreground text-sm mt-0.5">{description}</p>}
        </div>
      </div>
      {children && <div className="flex items-center gap-2 shrink-0">{children}</div>}
    </div>
  );
}
