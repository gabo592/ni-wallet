import { useEffect, useState, useTransition } from 'react';
import { getUser } from '../api/actions';
import { getSignedUrl } from '../api/actions';
import { toast } from 'sonner';

export const useUserImage = () => {
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string>('');

  function initData() {
    startTransition(async () => {
      const responseUser = await getUser();

      if (responseUser.isSuccess) {
        const responseImage = await getSignedUrl(
          responseUser.data?.profile_image_url ?? ''
        );

        if (responseImage.isSuccess) {
          setImageUrl(responseImage.data);
        } else {
          toast.error('Error al obtener la imagen del usuario', {
            description: responseImage.error,
          });
        }
      } else {
        toast.error('Error al obtener datos del usuario', {
          description: responseUser.error,
        });
      }
    });
  }

  useEffect(() => {
    initData();
  }, []);

  return {
    isPending,
    imageUrl,
  };
};
