import { Input } from '@/shared/ui/input';
import { ComponentProps, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { uploadProfilePicture } from './actions';

export const useChangeImageDialog = () => {
  const [image, setImage] = useState<File | undefined>();
  const [isPending, startTransition] = useTransition();

  const onChange: ComponentProps<typeof Input>['onChange'] = (event) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];

    if (file) {
      setImage(file);
    }
  };

  function onSubmit() {
    if (!image) {
      toast.error('No se seleccionó una imagen');
      return;
    }

    const formData = new FormData();
    formData.append('picture', image);

    startTransition(async () => {
      const response = await uploadProfilePicture(formData);

      if (response.isSuccess) {
        toast.success('Imagen actualizada');
      } else {
        toast.error('Error al actualizar la imagen', {
          description: response.error,
        });
      }
    });
  }

  return {
    onChange,
    onSubmit,
    isPending,
  };
};
