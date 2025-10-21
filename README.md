# Playwright TestFire Bank - Testes Automatizados

Projeto de testes end-to-end (E2E) para o sistema bancário demo **TestFire Bank** usando **Playwright** com **TypeScript**.

## Sobre o Projeto

Este projeto implementa testes automatizados para validar funcionalidades críticas do sistema bancário TestFire, incluindo:

- Login de usuários
- Transferências bancárias entre contas
- Validação de saldos e extratos
- Navegação entre páginas

O projeto utiliza o padrão **Page Object Model (POM)** para organização e manutenção dos testes.

---

## Estrutura do Projeto

```
bank/
├── fixtures/
│   └── bankingData.ts          # Dados de teste (credenciais, contas, valores)
├── pages/
│   ├── loginPage.ts            # Page Object da página de Login
│   ├── mainPage.ts             # Page Object da página principal
│   ├── transferPage.ts         # Page Object da página de transferência
│   └── accountSummaryPage.ts   # Page Object da página de resumo da conta
├── tests/
│   └── bank_transfer.spec.ts   # Teste de transferência bancária
├── playwright.config.ts         # Configuração do Playwright
├── package.json                 # Dependências do projeto
└── README.md                    # Este arquivo
```

---

## Descrição dos Arquivos

### `/fixtures/bankingData.ts`

Contém os dados de teste centralizados:

- **CREDENTIALS**: Usuário e senha para login
- **ACCOUNTS**: IDs das contas bancárias (corporate, checking)
- **TRANSFER_AMOUNT**: Valor fixo para transferências

### `/pages/loginPage.ts`

Page Object da página de login. Responsabilidades:

- Navegar para a página de login
- Preencher credenciais e realizar login
- Validar sucesso do login verificando o link "Sign Off"

**Métodos principais:**

- `goto()`: Navega para `/login.jsp`
- `login(username, password)`: Realiza o login
- `checkLoginSuccess()`: Verifica se o login foi bem-sucedido

### `/pages/mainPage.ts`

Page Object da página principal após login. Responsabilidades:

- Navegar para área de transferências
- Acessar resumo de contas

**Métodos principais:**

- `clickTransferFunds()`: Acessa a página de transferências
- `clickAccountSummary()`: Acessa o resumo da conta

### `/pages/transferPage.ts`

Page Object da página de transferências. Responsabilidades:

- Realizar transferências entre contas
- Validar sucesso da operação

**Métodos principais:**

- `makeTransfer(from, to, amount)`: Executa uma transferência
- `checkTransferSuccess()`: Valida a mensagem de confirmação

### `/pages/accountSummaryPage.ts`

Page Object da página de resumo/extrato da conta. Responsabilidades:

- Selecionar conta para visualização
- Obter saldo disponível
- Verificar transações recentes

**Métodos principais:**

- `selectAccount(account)`: Seleciona uma conta específica
- `getAvailableBalance()`: Retorna o saldo disponível como número
- `checkLastTransaction(amount)`: Valida o valor da última transação
- `parseMoneyValue(text)`: Método privado que converte texto monetário em número

### `/tests/bank_transfer.spec.ts`

Teste completo de transferência bancária que valida:

1. Login no sistema
2. Captura do saldo inicial
3. Execução de transferência entre contas
4. Validação do valor transferido no extrato
5. Validação do saldo atualizado

**Estrutura do teste:**

- **beforeEach**: Hook executado antes de cada teste que:
  - Instancia todos os Page Objects necessários
  - Realiza a navegação até a página de login
  - Executa o login automaticamente
  - Valida o sucesso do login
- **test**: Cada teste começa com o usuário já autenticado, focando apenas na lógica específica do cenário

Esta estrutura segue as melhores práticas do Playwright, garantindo:
- Isolamento entre testes
- Reutilização de código
- Estado limpo antes de cada execução
- Facilidade para adicionar novos testes no futuro

### `/playwright.config.ts`

Configuração do Playwright:

- **testDir**: Diretório de testes (`./tests`)
- **baseURL**: URL base do TestFire Bank
- **fullyParallel**: Execução paralela de testes
- **reporter**: Relatório HTML
- **projects**: Configurado para Chromium e Firefox
- **trace**: Captura de trace em caso de falha

---

## Pré-requisitos

- **Node.js** versão 18 ou superior
- **npm** ou **yarn**

---

## Instalação

1. Clone ou baixe o projeto

2. Instale as dependências:

```bash
npm install
```

3. Instale os navegadores do Playwright:

```bash
npx playwright install
```

---

## Como Executar os Testes

### Executar todos os testes

```bash
npx playwright test
```

### Executar em um navegador específico

```bash
# Chrome/Chromium
npx playwright test --project=chromium

# Firefox
npx playwright test --project=firefox
```

### Executar um teste específico

```bash
npx playwright test tests/bank_transfer.spec.ts
```

### Executar com interface gráfica (modo debug)

```bash
npx playwright test --ui
```

### Executar em modo debug

```bash
npx playwright test --debug
```

### Ver relatório HTML após execução

```bash
npx playwright show-report
```

### Executar testes com trace

```bash
npx playwright test --trace on
```

---

## Comandos Úteis

### Gerar código automaticamente (Codegen)

```bash
npx playwright codegen https://demo.testfire.net
```

### Visualizar trace de um teste

```bash
npx playwright show-trace trace.zip
```

### Executar testes em modo headless (sem interface)

```bash
npx playwright test --headed
```

### Executar com um único worker (sem paralelização)

```bash
npx playwright test --workers=1
```

---

## Padrões de Código

### Page Object Model (POM)

O projeto segue o padrão POM, separando:

- **Locators**: Definidos como propriedades readonly da classe
- **Actions**: Métodos que realizam ações na página
- **Assertions**: Validações específicas da página

### Nomenclatura

- **Classes**: PascalCase (ex: `LoginPage`)
- **Métodos**: camelCase (ex: `checkLoginSuccess()`)
- **Constantes**: UPPER_SNAKE_CASE (ex: `TRANSFER_AMOUNT`)

### Seletores

Preferência de seletores (em ordem):

1. **IDs** (`#elementId`)
2. **data-testid** (quando disponível)
3. **Seletores CSS** (`td:has-text("texto") + td`)
4. **getByRole/getByText** (métodos do Playwright)
5. **XPath** (evitado, usar apenas quando necessário)

---

## Relatórios

Após executar os testes, um relatório HTML é gerado automaticamente em:

```
playwright-report/index.html
```

Para visualizar:

```bash
npx playwright show-report
```

O relatório inclui:

- Status de cada teste (passou/falhou)
- Tempo de execução
- Screenshots em caso de falha
- Trace detalhado para debug

---

## Informações Importantes

### Site de Teste

- **URL**: https://demo.testfire.net
- **Ambiente**: Demo público da Parasoft
- **Credenciais**: Definidas em `fixtures/bankingData.ts`

### Nota sobre Segurança

**IMPORTANTE**: As credenciais estão hardcoded apenas por se tratar de um ambiente de demonstração público. Em projetos reais, utilize:

- Variáveis de ambiente (`.env`)
- Gerenciadores de secrets (AWS Secrets Manager, Azure Key Vault)
- Nunca commitar credenciais reais no código

---

## Tecnologias Utilizadas

- **Playwright** v1.56.1 - Framework de testes E2E
- **TypeScript** - Linguagem fortemente tipada
- **Node.js** - Runtime JavaScript

---

## Autor

Andreas Engel

---

## Licença

ISC

---
