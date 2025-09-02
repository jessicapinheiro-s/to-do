import FormAccount from "@/components/form-account/account-form";
import Header from "@/components/header/header";
import { createClient } from "@/utils/supabase/server"
import { redirect } from 'next/navigation'

export default async function MinhaConta() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/');
    }

    return (
        <div className="flex flex-col">
            <Header />
            <main className="flex-1 w-full h-full flex flex-col items-center justify-start p-10 md:p-20 gap-y-4">
                <FormAccount user={user} />
            </main>
        </div>

    )
}