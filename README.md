# FinanceTracker

# 💰 Finance Tracker

## 📱 Sobre o app

O **Finance Tracker** é um aplicativo mobile desenvolvido com React Native (Expo) que tem como objetivo auxiliar usuários no controle de suas finanças pessoais, permitindo o registro, visualização e gerenciamento de receitas e despesas de forma simples e intuitiva.

O aplicativo busca fornecer uma visão clara da situação financeira do usuário, possibilitando melhor tomada de decisões através do acompanhamento de transações e categorização de gastos.

### ✅ Funcionalidades planejadas

#### 🔹 Funcionalidades básicas

* [ ] Adicionar receita
* [ ] Adicionar despesa
* [ ] Listar transações
* [ ] Editar transações
* [ ] Excluir transações
* [ ] Exibir saldo total

#### 🔹 Funcionalidades intermediárias

* [ ] Filtrar transações por categoria
* [ ] Filtrar por período (data)
* [ ] Exibir resumo financeiro (total de receitas vs despesas)

#### 🔹 Funcionalidades extras - Implementações futuras

* [ ] Gráfico de gastos
* [ ] Categorias personalizadas
* [ ] Modo escuro

---

## 🎨 Protótipos de tela

Os protótipos das telas foram desenvolvidos no Figma e podem ser acessados através do link abaixo:

👉 https://www.figma.com/make/sSEm7YCKqRCP6uPPcmUf28/Finance-Tracker?t=kcT4awEMEuzuq343-20&fullscreen=1

As principais telas do aplicativo incluem:

* Tela inicial (resumo + lista de transações)
* Tela de cadastro de transação
* Tela de edição/detalhes de transação
* (Opcional) Tela de gráficos

---

## 🗄️ Modelagem do banco de dados

O aplicativo utilizará **persistência local com SQLite**, garantindo funcionamento offline.

### 📊 Estrutura da tabela: `transactions`

| Campo    | Tipo    | Descrição                   |
| -------- | ------- | --------------------------- |
| id       | INTEGER | Identificador único         |
| title    | TEXT    | Descrição da transação      |
| amount   | REAL    | Valor da transação          |
| type     | TEXT    | Tipo: `income` ou `expense` |
| category | TEXT    | Categoria da transação      |
| date     | TEXT    | Data da transação           |

👉 Modelagem completa disponível em:
https://drive.google.com/file/d/1eHNwyvy6sEdQ2hkRl96oFe_KLj5IzOIC/view?usp=sharing

---

## 🏃 Planejamento de sprints (12 semanas)

### 📅 Semana 1

* [x] Definição do projeto
* [x] Criação do repositório no GitHub
* [x] Escrita inicial do README

### 📅 Semana 2

* [ ] Criação do projeto com Expo
* [ ] Configuração do ambiente
* [ ] Estrutura inicial de pastas

### 📅 Semana 3

* [ ] Configuração do Expo Router
* [ ] Criação das telas base
* [ ] Navegação entre telas

### 📅 Semana 4

* [ ] Criação de componentes reutilizáveis (Button, Input)
* [ ] Organização do projeto

### 📅 Semana 5

* [ ] Implementação da tela de cadastro de transação
* [ ] Validação de formulário

### 📅 Semana 6

* [ ] Implementação do estado global (Zustand)
* [ ] Gerenciamento das transações em memória

### 📅 Semana 7

* [ ] Integração com SQLite
* [ ] Persistência de dados

### 📅 Semana 8

* [ ] Listagem de transações na tela inicial
* [ ] Cálculo de saldo total

### 📅 Semana 9

* [ ] Edição e exclusão de transações
* [ ] Melhorias na UX

### 📅 Semana 10

* [ ] Filtros por categoria e data
* [ ] Resumo financeiro

### 📅 Semana 11

* [ ] Implementação de gráficos
* [ ] Estilização com NativeWind/UI Kit

### 📅 Semana 12

* [ ] Testes finais
* [ ] Ajustes gerais
* [ ] Build com EAS
* [ ] Preparação da apresentação

---

## 🛠️ Tecnologias utilizadas

* React Native (Expo)
* Expo Router
* NativeWind
* SQLite
* Zustand (gerenciamento de estado global)

---

## 📦 Repositório

👉 https://github.com/joao-sol/FinanceTracker

---

## 📌 Observações

Este projeto está sendo desenvolvido como parte da disciplina de **Desenvolvimento de Projetos para Dispositivos Móveis**, com entregas organizadas em checkpoints ao longo do semestre.
