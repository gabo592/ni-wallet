import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';
import { FC, Fragment } from 'react';
import { BreadcrumbNavProps } from '../model/types';
import Link from 'next/link';

export const BreadcrumbNav: FC<BreadcrumbNavProps> = ({ routes }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {routes.map((route, index) => {
          const isLast = index === routes.length - 1;

          return (
            <Fragment key={route.href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{route.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={route.href}>{route.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
