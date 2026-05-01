"use client";
// components/shared/ConfirmDialog.tsx
import { useState } from "react";
import { Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => Promise<void>;
  title: string;
  description: string;
  confirmLabel?: string;
  confirmVariant?: "default" | "destructive";
  requireReason?: boolean;
  reasonLabel?: string;
  reasonPlaceholder?: string;
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  confirmVariant = "destructive",
  requireReason = false,
  reasonLabel = "Reason",
  reasonPlaceholder = "Enter reason...",
}: ConfirmDialogProps) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm(requireReason ? reason : undefined);
      setReason("");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
            <AlertTriangle size={18} className="text-destructive" />
          </div>
          <div>
            <h3 className="font-heading text-base font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
        </div>

        {requireReason && (
          <div className="mb-4">
            <Label className="text-sm text-muted-foreground mb-1.5 block">{reasonLabel}</Label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={reasonPlaceholder}
              className="resize-none h-24 text-sm"
            />
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={onClose} disabled={loading} size="sm">
            Cancel
          </Button>
          <Button
            variant={confirmVariant}
            onClick={handleConfirm}
            disabled={loading || (requireReason && !reason.trim())}
            size="sm"
          >
            {loading && <Loader2 size={14} className="animate-spin mr-1.5" />}
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
