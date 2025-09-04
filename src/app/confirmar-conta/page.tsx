import { RiMailSendFill } from "react-icons/ri";

export default function ErrorPage() {
    return (
        <section className="w-full min-h-screen flex-1 flex self-stretch flex-col items-center justify-center gap-4 px-6 md:px-20 ">
            <div>
                <RiMailSendFill className="text-blue-600 text-6xl"/>

            </div>
            <div className="flex flex-col items-center gap-1 text-center">
                <h2 className="text-3xl font-semibold">Pleaser, confirm your e-mail</h2>
                <p className="text-[#4A4A4A] text-[16px]">We sent a confirmation e-mail for you to confirm the validity your e-mail adress.</p>
            </div>
        </section>
    )
}