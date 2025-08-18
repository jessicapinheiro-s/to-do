import FormCadastroTarefas from "@/components/form-cadastro-tarefas/form-cadastro-tarefas";
import Header from "@/components/header/header";

export default  function CadastrarTarefa () {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <FormCadastroTarefas/>
        </div>
    )
}