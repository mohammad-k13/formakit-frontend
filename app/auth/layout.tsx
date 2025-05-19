import React, { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
      return (
            <section className="h-screen w-screen overflow-hidden flex items-center justify-center">
                  <main className='border rounded-md p-3 w-full'>{children}</main>
            </section>
      );
};

export default AuthLayout;
