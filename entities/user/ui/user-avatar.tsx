import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { getUser } from '../api/actions';

export const UserAvatar = async () => {
  const { data } = await getUser();

  return (
    <Avatar>
      <AvatarImage src={data?.profile_image_url ?? ''} />
      <AvatarFallback>
        {`${data?.first_name?.[0].toUpperCase()}${data?.last_name?.[0].toUpperCase()}`}
      </AvatarFallback>
    </Avatar>
  );
};
