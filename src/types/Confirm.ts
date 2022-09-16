import type { ButtonColor } from "@/types/Button";

export type ConfirmOptions = {
  onConfirm: () => void;
  onClose: () => void;
  show: boolean;
  body: string;
  cancelButtonText: string;
  confirmButtonColor: ButtonColor;
  confirmButtonText: string;
};

