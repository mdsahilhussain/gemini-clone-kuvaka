import { BotMessageSquareIcon } from "lucide-react";

const DashboardPage = () => {
  return (
    <section className="flex flex-col gap-4 w-full h-full p-8 md:p-24">
      <BotMessageSquareIcon
        size={68}
        className="text-neutral-800 dark:text-neutral-50"
      />
      <h1 className="text-2xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-50 capitalize">
        Select a chatroom to begin
      </h1>
    </section>
  );
};

export default DashboardPage;
