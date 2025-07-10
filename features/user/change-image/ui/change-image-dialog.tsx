'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { ImageIcon, Loader2 } from 'lucide-react';
import { useChangeImageDialog } from '../model/use-change-image-dialog';

export const ChangeImageDialog = () => {
  const { onChange, onSubmit, isPending } = useChangeImageDialog();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ImageIcon className="w-4 h-4" />
          Cambiar Foto de Perfil
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cambiar Foto de Perfil</DialogTitle>
          <DialogDescription>Sube una nueva foto de perfil</DialogDescription>
        </DialogHeader>
        <div className="grid w-full items-center gap-3">
          <Input
            id="picture"
            type="file"
            accept="image/*"
            onChange={onChange}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={() => onSubmit()} disabled={isPending}>
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
