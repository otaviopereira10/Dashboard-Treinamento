
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface LogoutConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function LogoutConfirmDialog({ 
  open, 
  onOpenChange, 
  onConfirm, 
  onCancel 
}: LogoutConfirmDialogProps) {
  
  const handleConfirmLogout = () => {
    // Chamar a função de confirmação se fornecida
    if (onConfirm) {
      onConfirm();
    }
    
    // Fechar o diálogo
    onOpenChange(false);
  };

  const handleCancel = () => {
    // Chamar a função de cancelamento se fornecida
    if (onCancel) {
      onCancel();
    }
    
    // Fechar o diálogo
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirmar saída</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja sair do sistema? Suas alterações não salvas serão perdidas.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleConfirmLogout}>
            Sair
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
