import { ReactNode } from "react";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return <main>{children}</main>;
};
export default RootLayout;
