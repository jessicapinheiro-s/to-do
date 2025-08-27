import AuthPage from "./login/page";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16 ">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <AuthPage />
      </main>
    </div>
  );
}
