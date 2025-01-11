'use client';

import { FC, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface DeleteAlertDialogProps {
  id: string;
  // eslint-disable-next-line no-unused-vars
  onConfirm: (id: string) => Promise<void>;
}

export const DeleteAlertDialog: FC<DeleteAlertDialogProps> = ({ id, onConfirm }) => {
  const [isLoading, setIsLoading] = useState(false);

  async function onAction() {
    try {
      setIsLoading(true);
      await onConfirm(id);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast.error('Error al eliminar el registro.');
      setIsLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="h-4 w-4" />
          Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Desea eliminar este registro?</AlertDialogTitle>
          <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => onAction()} disabled={isLoading}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
