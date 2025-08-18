import Link from "next/link";

export default  function Header () {
    return (
        <header className=" flex flex-row items-center justify-between border px-60 py-5">
            <div className="flex flex-row items-center justify-between">
                <div>
                    icone
                </div>
                <div>
                    TO DO
                </div>
            </div>
            <nav>
                <ul className="flex flex-row items-center justify-between">
                    <li><Link href='./cadastrar-tarefa'>Minhas tarefas</Link></li>
                    <li><Link href='./cadastrar-tarefa'>Cadastrar nova tarefa</Link></li>
                </ul>
            </nav>
        </header>
    )
}