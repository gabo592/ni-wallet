'use client';

import { FC } from 'react';
import { Input } from '../ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface SearchProps {
  placeholder?: string;
}

export const Search: FC<SearchProps> = ({ placeholder = 'Buscar...' }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Input
      type="search"
      placeholder={placeholder}
      className="flex-1"
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get('search')?.toString()}
    />
  );
};
