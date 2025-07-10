'use client';

import { User2 } from 'lucide-react';
import { useUserImage } from '../model/use-user-image';

export const UserImage = () => {
  const { imageUrl } = useUserImage();

  if (imageUrl.length > 0) {
    return (
      <img
        src={imageUrl}
        alt="profile"
        width={120}
        height={120}
        className="rounded-full"
      />
    );
  }

  return <User2 className="w-16 h-16" />;
};
