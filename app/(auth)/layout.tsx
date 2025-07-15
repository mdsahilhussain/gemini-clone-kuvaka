const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-md p-6 space-y-4">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
