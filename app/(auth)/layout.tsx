import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="h-screen w-full flex justify-center items-center fixed">
      {children}
    </main>
  );
};

export default AuthLayout;
