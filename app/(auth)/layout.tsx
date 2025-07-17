const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-900 p-4">
      <div className="w-full max-w-xl bg-neutral-50 dark:bg-neutral-800 rounded-3xl p-6 space-y-6 relative card-shadow-gradient">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
