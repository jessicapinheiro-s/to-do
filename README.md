# To-Do Web App

Este repositório apresenta uma aplicação web de lista de tarefas, onde o usuário pode criar, gerenciar e excluir suas próprias tarefas. Foi implementado um sistema de autenticação que garante a segurança e o sigilo dos dados de cada usuário.

##  Funcionalidades
- **Autenticação de usuários** — cada pessoa acessa apenas suas tarefas;
- **CRUD completo de tarefas** — criação, leitura, atualização e exclusão;
- **Filtros inteligentes** — visualização por categoria ou status (diárias, semanais, mensais, concluídas, atrasadas etc.);
- **Interface responsiva e estilosa** com Tailwind CSS.

##  Tecnologias utilizadas
- **Next.js** — estrutura para roteamento e SSR/SSG;
- **React.js** + **TypeScript** — componentes tipados, seguros e modernos;
- **Tailwind CSS** — design modular e rápido;
- **Supabase** — backend completo (banco de dados, autenticação, RLS, etc.).

##  Estrutura
- `app/` ou `pages/` — componentes de interface e rotas;
- `components/` — partes reutilizáveis da interface, como `ContainerTask`, formulários, botões;
- `stores/` — global state com Zustand, para gerenciamento ágil das tarefas;
- `utils/` — funções de integração com Supabase, adaptadores e helpers utilitários.

##  Instruções para uso
1. Clone este repositório:
   ```bash
   git clone https://github.com/jessicapinheiro-s/to-do.git
