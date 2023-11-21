export default function AuthBg() {
  return (
    <div className="relative col-span-3 hidden h-screen flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-foreground" />
      <div className="relative z-20 flex items-center text-lg font-medium">
        Job Fair 2023
      </div>
    </div>
  );
}
