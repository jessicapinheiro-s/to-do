import Link from "next/link";

export default  function Header () {
    return (
        <header className=" flex flex-row items-center justify-between">
            <div>
                <div>
                    icone
                </div>
                <div>
                    TO DO
                </div>
            </div>
            <nav>
                <ul>
                    <li><Link href='./cadastrar-tarefa'>Minhas tarefas</Link></li>
                    <li><Link href='./cadastrar-tarefa'>Cadastrar nova tarefa</Link></li>
                </ul>
            </nav>
        </header>
    )
}