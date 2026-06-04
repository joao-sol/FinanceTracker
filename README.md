# 💰 Finance Tracker

## 📱 Sobre o app

O **Finance Tracker** é um aplicativo mobile desenvolvido com React Native (Expo) que tem como objetivo auxiliar usuários no controle de suas finanças pessoais, permitindo o registro, visualização e gerenciamento de receitas e despesas de forma simples e intuitiva.

O aplicativo busca fornecer uma visão clara da situação financeira do usuário, possibilitando melhor tomada de decisões através do acompanhamento de transações e categorização de gastos.

### ✅ Funcionalidades planejadas

#### 🔹 Funcionalidades básicas

- [x] Adicionar receita
- [x] Adicionar despesa
- [x] Listar transações
- [x] Editar transações
- [x] Excluir transações
- [x] Exibir saldo total

#### 🔹 Funcionalidades intermediárias

- [x] Filtrar transações por categoria
- [x] Filtrar por período (data)
- [x] Exibir resumo financeiro (total de receitas vs despesas)

#### 🔹 Funcionalidades extras - Implementações futuras

- [x] Gráfico de gastos
- [x] Categorias personalizadas
- [ ] Modo escuro

---

## 🎨 Protótipos de tela

Os protótipos das telas foram desenvolvidos no Figma e podem ser acessados através do link abaixo:

👉 https://www.figma.com/make/sSEm7YCKqRCP6uPPcmUf28/Finance-Tracker?t=kcT4awEMEuzuq343-20&fullscreen=1

As principais telas do aplicativo incluem:

- Tela inicial (resumo + lista de transações)
- Tela de cadastro de transação
- Tela de edição/detalhes de transação
- (Opcional) Tela de gráficos

---

## 🗄️ Modelagem do banco de dados

O aplicativo utilizará **persistência local com SQLite**, garantindo funcionamento offline.

### 📊 Estrutura das tabelas

#### 🔹 Tabela: `categories`

| Campo      | Tipo    | Descrição                                      |
| ---------- | ------- | ---------------------------------------------- |
| id         | INTEGER | Identificador único                            |
| name       | TEXT    | Nome da categoria                              |
| is_active  | INTEGER | Status da categoria: `1` ativa ou `0` inativa  |
| created_at | TEXT    | Data de criação                                |

---

#### 🔹 Tabela: `transactions`

| Campo       | Tipo    | Descrição                           |
| ----------- | ------- | ----------------------------------- |
| id          | INTEGER | Identificador único                 |
| title       | TEXT    | Descrição da transação              |
| amount      | REAL    | Valor da transação                  |
| type        | TEXT    | Tipo: `income` ou `expense`         |
| category_id | INTEGER | Chave estrangeira para `categories` |
| date        | TEXT    | Data da transação                   |
| created_at  | TEXT    | Data de criação                     |

---

### 🔗 Relacionamento

- Uma **categoria** pode estar associada a várias **transações**
- Cada **transação** pertence a uma única **categoria**
- Categorias não são excluídas quando possuem histórico: elas podem ser marcadas como **inativas** para preservar transações antigas

👉 Modelagem completa disponível em:
https://drive.google.com/file/d/1eHNwyvy6sEdQ2hkRl96oFe_KLj5IzOIC/view?usp=sharing

---

## 🏃 Planejamento de sprints (12 semanas)

### 📅 Semana 1

- [x] Definição do projeto
- [x] Criação do repositório no GitHub
- [x] Escrita inicial do README

### 📅 Semana 2

- [x] Criação das telas base

### 📅 Semana 3

- [x] Criação de componentes reutilizáveis (Button, Input)
- [x] Organização do projeto

### 📅 Semana 4

- [x] Implementação da tela de cadastro de transação
- [x] Validação de formulário

### 📅 Semana 5

- [x] Implementação do estado global (Zustand)
- [x] Gerenciamento das transações em memória

### 📅 Semana 6

- [x] Integração com SQLite
- [x] Persistência de dados

### 📅 Semana 7

- [x] Listagem de transações na tela inicial
- [x] Cálculo de saldo total

### 📅 Semana 8

- [x] Edição e exclusão de transações
- [x] Melhorias na UX

### 📅 Semana 9

- [x] Filtros por categoria e data
- [x] Resumo financeiro

### 📅 Semana 10

- [x] Implementação de gráficos
- [ ] Estilização com NativeWind/UI Kit

### 📅 Semana 11

- [ ] Testes finais
- [ ] Ajustes gerais
- [ ] Build com EAS
- [ ] Preparação da apresentação

---

## 🛠️ Tecnologias utilizadas

- React Native (Expo)
- Expo Router
- NativeWind
- SQLite
- Zustand (gerenciamento de estado global)

---

## Atualizações desde o último checkpoint

Desde o último checkpoint, foram aplicados recursos estudados nos módulos anteriores da disciplina, com foco na estruturação inicial do aplicativo, navegação entre telas, gerenciamento de estado e componentização da interface.

### Recursos aplicados

- **Expo Router:** utilizado para configurar a navegação do aplicativo. Foram criadas as telas `Início`, `Nova Transação` e `Gráficos`, garantindo a navegação entre elas.
- **Layout principal com Stack:** utilizado no arquivo `app/_layout.tsx` para organizar a navegação raiz da aplicação, separando o grupo de abas da tela de nova transação.
- **Layout com Tabs:** utilizado no arquivo `app/(tabs)/_layout.tsx` para configurar a navegação inferior entre as telas `Início` e `Gráficos`.
- **Tela de nova transação fora das abas:** a tela `Nova Transação` foi configurada fora do grupo `(tabs)`, para que seja aberta sem a barra inferior, mantendo o comportamento previsto no protótipo.
- **Zustand:** utilizado para gerenciamento de estado global. Foram criadas as stores `useTransactionStore` e `useCategoryStore`, responsáveis por centralizar transações e categorias carregadas do banco local.
- **Dados iniciais:** utilizados na primeira execução para popular o SQLite e permitir demonstrar listagem de transações, filtros, cálculo de saldo, receitas, despesas e gráficos.
- **React Native Chart Kit:** utilizado para exibir gráficos financeiros na tela de análise, incluindo gráfico de pizza e gráfico de barras.
- **Picker de categorias:** utilizado para permitir a seleção padronizada de categorias, tanto nos filtros quanto na tela de nova transação.
- **SQLite local:** utilizado para persistir categorias e transações no dispositivo, mantendo os dados mesmo após fechar o aplicativo.

### Boas práticas de componentes reutilizáveis aplicadas

- **Separação de responsabilidades:** cada componente foi criado com uma função específica. O componente `TransactionCard` é responsável por exibir uma transação, enquanto o componente `FilterChip` é responsável pelos filtros de tipo da tela inicial.
- **Uso de props:** os componentes recebem dados por propriedades, permitindo reutilização em diferentes contextos. Por exemplo, o `TransactionCard` recebe título, categoria, valor, data e tipo da transação.
- **Estilização condicional:** o `TransactionCard` altera cores, ícones e sinal do valor conforme o tipo da transação (`income` ou `expense`). O `FilterChip` também muda seu visual conforme o estado ativo ou inativo.
- **Tipagem com TypeScript:** foram definidos tipos para categorias, transações e propriedades dos componentes, reduzindo erros e facilitando a manutenção do código.
- **Organização de estilos em arquivos separados:** os estilos foram separados em arquivos próprios, como `_styles.ts` e `_layout.styles.ts`, deixando os arquivos de tela e componentes mais limpos.
- **Reutilização de componentes:** componentes personalizados criados na pasta `components` foram utilizados nas telas do aplicativo, evitando repetição de código e mantendo consistência visual.
- **Composição de tela com dados dinâmicos:** a tela inicial reutiliza o componente `TransactionCard` para renderizar diferentes transações a partir dos dados armazenados na store.

- **Vídeo de demonstração da navegação:**
  https://youtube.com/shorts/msovfQOObo8

## 📦 Repositório

👉 https://github.com/joao-sol/FinanceTracker

---

## ▶️ Como rodar na sua máquina

Siga os passos abaixo para executar o projeto localmente:

### 📌 Pré-requisitos

Antes de começar, você precisa ter instalado:

- Node.js (versão LTS recomendada)
- Yarn ou NPM
- Expo CLI (opcional, pois usamos via `npx`)
- Aplicativo **Expo Go** no celular (Android/iOS)

---

### 📥 Clonando o repositório

```bash
git clone https://github.com/joao-sol/FinanceTracker
cd finance-tracker
```

---

### 📦 Instalando as dependências

Se estiver usando Yarn:

```bash
yarn
```

Ou com NPM:

```bash
npm install
```

---

### 🚀 Executando o projeto

```bash
npx expo start
```

---

### 📱 Rodando no celular

1. Instale o app **Expo Go**
2. Escaneie o QR Code exibido no terminal ou navegador
3. O app será aberto automaticamente no seu dispositivo

---

### 💻 Rodando no emulador (opcional)

- Android:

```bash
a
```

- iOS (apenas Mac):

```bash
i
```

---

### ⚠️ Observações

- Certifique-se de que o celular e o computador estão na mesma rede
- Caso ocorra algum erro, tente limpar o cache:

```bash
npx expo start -c
```

## 📌 Observações

Este projeto está sendo desenvolvido como parte da disciplina de **Desenvolvimento de Projetos para Dispositivos Móveis**, com entregas organizadas em checkpoints ao longo do semestre.
