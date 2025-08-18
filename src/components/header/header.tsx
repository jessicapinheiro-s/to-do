import Link from "next/link";
import { SiTask } from "react-icons/si";

export default  function Header () {
    return (
        <header className="flex flex-row items-center justify-between border border-[#e0e0e0] px-60 py-5">
            <div className="flex flex-row items-center justify-between">
                <div>
                    <SiTask />
                </div>
                <div>
                    <h1 className="font-bold text-3xl">TO DO</h1>
                </div>
            </div>
            <nav>
                <ul className="flex flex-row items-center justify-between gap-4">
                    <li><Link href='./cadastrar-tarefa'>Minhas tarefas</Link></li>
                    <li><Link href='./cadastrar-tarefa'>Cadastrar nova tarefa</Link></li>
                </ul>
            </nav>
        </header>
    )
}