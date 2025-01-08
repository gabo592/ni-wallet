'use client';

import { FC, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Pencil } from 'lucide-react';
import { EditProfileForm } from './edit-profile-form';
import { User } from '@/types/user';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';

interface EditProfileDrawerDialogProps {
  user: User;
}

export const EditProfileDrawerDialog: FC<EditProfileDrawerDialogProps> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const isDesktop = window.innerWidth > 1024;

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={'outline'}>
            <Pencil className="w-4 h-4" />
            Editar Información
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Información</DialogTitle>
            <DialogDescription>
              En esta sección puedes editar tu información personal.
            </DialogDescription>
          </DialogHeader>
          <EditProfileForm user={user} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={'outline'}>
          <Pencil className="w-4 h-4" />
          Editar Información
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Editar Información</DrawerTitle>
          <DrawerDescription>
            En esta sección puedes editar tu información personal.
          </DrawerDescription>
        </DrawerHeader>
        <EditProfileForm user={user} className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant={'outline'}>Cerrar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
