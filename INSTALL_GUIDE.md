# Guia Completo de Instalação e Publicação - n8n-nodes-syrus-ai

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter:

- **Node.js** versão 18.10 ou superior
- **NPM** ou **PNPM** instalado
- Uma conta no [npmjs.com](https://www.npmjs.com/)
- **Git** instalado e configurado
- Uma conta ativa na **Syrus AI** com API key

## 🚀 Passo a Passo para Publicação no NPM

### 1. Preparação do Ambiente

```bash
# Clone ou baixe o projeto
git clone https://github.com/syrus-ai/n8n-nodes-syrus-ai.git
cd n8n-nodes-syrus-ai

# Instale as dependências
npm install

# Compile o projeto
npm run build
```

### 2. Configuração da Conta NPM

```bash
# Faça login na sua conta NPM
npm login

# Verifique se está logado
npm whoami
```

### 3. Verificação e Testes

```bash
# Execute os lints
npm run lint

# Formate o código
npm run format

# Execute os testes (se houver)
npm test
```

### 4. Publicação

```bash
# Publique o pacote
npm publish

# Para versões beta ou teste
npm publish --tag beta
```

### 5. Verificação da Publicação

Após a publicação, verifique em:
- [https://www.npmjs.com/package/n8n-nodes-syrus-ai](https://www.npmjs.com/package/n8n-nodes-syrus-ai)

## 🔧 Instalação no n8n

### Método 1: Via Interface do n8n (Recomendado)

1. Abra sua instância do n8n
2. Vá para **Settings** → **Community Nodes**
3. Clique em **Install**
4. Digite: `n8n-nodes-syrus-ai`
5. Clique em **Install**

### Método 2: Via NPM (Manual)

```bash
# No diretório do seu projeto n8n
npm install n8n-nodes-syrus-ai

# Reinicie o n8n
```

### Método 3: Via PNPM

```bash
# No diretório do seu projeto n8n
pnpm add n8n-nodes-syrus-ai

# Reinicie o n8n
```

## ⚙️ Configuração Inicial

### 1. Criando Credenciais

1. No n8n, vá para **Credentials**
2. Clique em **Create New**
3. Procure por **Syrus AI API**
4. Configure:
   - **API URL**: `https://api.syrus-ai.com/syrus-api` (pré-preenchido)
   - **API Key**: Sua chave da Syrus AI
5. Clique em **Test** para verificar
6. Salve as credenciais

### 2. Primeiro Teste

1. Crie um novo workflow
2. Adicione o node **Syrus AI**
3. Selecione suas credenciais
4. Digite uma mensagem de teste
5. Execute o workflow

## 🛠️ Desenvolvimento Local

### Estrutura do Projeto

```
n8n-nodes-syrus-ai/
├── credentials/
│   └── SyrusAiApi.credentials.ts    # Configuração de credenciais
├── nodes/
│   └── SyrusAi/
│       ├── SyrusAi.node.ts          # Lógica principal do node
│       └── syrusai.svg              # Ícone do node
├── dist/                            # Arquivos compilados
├── package.json                     # Configuração do NPM
├── tsconfig.json                    # Configuração TypeScript
├── gulpfile.js                      # Build dos ícones
├── .eslintrc.js                     # Configuração ESLint
├── .prettierrc.js                   # Configuração Prettier
├── README.md                        # Documentação
└── LICENSE                          # Licença MIT
```

### Scripts Disponíveis

```bash
# Compilar o projeto
npm run build

# Modo desenvolvimento (watch)
npm run dev

# Formatar código
npm run format

# Verificar lint
npm run lint

# Corrigir problemas de lint
npm run lintfix

# Preparar para publicação
npm run prepublishOnly
```

### Desenvolvimento com Link Local

```bash
# No diretório do projeto
npm link

# No diretório do n8n
npm link n8n-nodes-syrus-ai

# Para desfazer
npm unlink n8n-nodes-syrus-ai
```

## 🔍 Solução de Problemas

### Erro de Compilação

```bash
# Limpe e reinstale dependências
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Erro de Publicação

```bash
# Verifique se está logado
npm whoami

# Verifique se o nome não está em uso
npm view n8n-nodes-syrus-ai

# Tente com escopo (se necessário)
npm publish --access public
```

### Node Não Aparece no n8n

1. Verifique se o n8n foi reiniciado
2. Confirme se o pacote foi instalado corretamente
3. Verifique os logs do n8n para erros
4. Teste com `npm ls n8n-nodes-syrus-ai`

### Problemas de Credenciais

1. Verifique se a API key está correta
2. Confirme se a URL está como `https://api.syrus-ai.com/syrus-api`
3. Teste a API diretamente com curl:

```bash
curl -X POST https://api.syrus-ai.com/syrus-api \
  -H "Content-Type: application/json" \
  -H "syrus-api-key: SUA_API_KEY" \
  -d '{
    "contents": [
      {
        "role": "user",
        "parts": [{"text": "Hello"}]
      }
    ],
    "generationConfig": {
      "maxOutputTokens": 100
    }
  }'
```

## 📊 Monitoramento e Métricas

### Verificar Downloads

```bash
# Ver estatísticas do pacote
npm view n8n-nodes-syrus-ai

# Ver downloads
npm view n8n-nodes-syrus-ai --json
```

### Logs do n8n

```bash
# Ver logs em tempo real
docker logs -f n8n_container_name

# Ou se instalado localmente
tail -f ~/.n8n/logs/n8n.log
```

## 🔄 Atualizações

### Publicar Nova Versão

```bash
# Atualizar versão
npm version patch  # ou minor, major

# Publicar
npm publish

# Criar tag no Git
git push --tags
```

### Versioning Semântico

- **patch** (1.0.1): Correções de bugs
- **minor** (1.1.0): Novas funcionalidades
- **major** (2.0.0): Mudanças que quebram compatibilidade

## 📞 Suporte

### Recursos Úteis

- **Documentação n8n**: [https://docs.n8n.io/](https://docs.n8n.io/)
- **Community Nodes**: [https://docs.n8n.io/integrations/community-nodes/](https://docs.n8n.io/integrations/community-nodes/)
- **NPM Registry**: [https://www.npmjs.com/](https://www.npmjs.com/)
- **Syrus AI Docs**: [https://api.syrus-ai.com/docs](https://api.syrus-ai.com/docs)

### Contato

- **Issues**: [GitHub Issues](https://github.com/syrus-ai/n8n-nodes-syrus-ai/issues)
- **Email**: support@syrus-ai.com
- **Comunidade n8n**: [https://community.n8n.io/](https://community.n8n.io/)

---

**Desenvolvido com ❤️ pela equipe Syrus AI**

