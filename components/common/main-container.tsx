import {PropsWithChildren} from "react";

export function MainContainer({children}: PropsWithChildren) {
  return <main className='flex flex-col items-center p-4 gap-8'>{children}</main>
}
