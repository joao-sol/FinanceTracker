# 💰 Finance Tracker

## 📱 Sobre o app

O **Finance Tracker** é um aplicativo mobile desenvolvido com React Native (Expo) que tem como objetivo auxiliar usuários no controle de suas finanças pessoais, permitindo o registro, visualização e gerenciamento de receitas e despesas de forma simples e intuitiva.

O aplicativo busca fornecer uma visão clara da situação financeira do usuário, possibilitando melhor tomada de decisões através do acompanhamento de transações e categorização de gastos.

### ✅ Funcionalidades planejadas

#### 🔹 Funcionalidades básicas

- [ ] Adicionar receita
- [ ] Adicionar despesa
- [ ] Listar transações
- [ ] Editar transações
- [ ] Excluir transações
- [ ] Exibir saldo total

#### 🔹 Funcionalidades intermediárias

- [ ] Filtrar transações por categoria
- [ ] Filtrar por período (data)
- [ ] Exibir resumo financeiro (total de receitas vs despesas)

#### 🔹 Funcionalidades extras - Implementações futuras

- [ ] Gráfico de gastos
- [ ] Categorias personalizadas
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

| Campo      | Tipo    | Descrição           |
| ---------- | ------- | ------------------- |
| id         | INTEGER | Identificador único |
| name       | TEXT    | Nome da categoria   |
| created_at | TEXT    | Data de criação     |

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
- [ ] Validação de formulário

### 📅 Semana 5

- [x] Implementação do estado global (Zustand)
- [x] Gerenciamento das transações em memória

### 📅 Semana 6

- [ ] Integração com SQLite
- [ ] Persistência de dados

### 📅 Semana 7

- [x] Listagem de transações na tela inicial
- [x] Cálculo de saldo total

### 📅 Semana 8

- [ ] Edição e exclusão de transações
- [ ] Melhorias na UX

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
