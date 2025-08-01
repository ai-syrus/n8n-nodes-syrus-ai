# n8n-nodes-syrus-ai

![Syrus AI Logo](https://raw.githubusercontent.com/syrus-ai/n8n-nodes-syrus-ai/main/nodes/SyrusAi/syrusai.svg)

Um Community Node para n8n que integra a **Syrus AI**, uma poderosa IA baseada no modelo Gemini com configurações avançadas e recursos de segurança robustos.

## 🚀 Características

- **Integração completa com Syrus AI**: Acesse o modelo Gemma3-27b-it através da API da Syrus AI
- **Configurações avançadas**: Controle total sobre temperatura, top-k, top-p e número máximo de tokens
- **Safety Settings**: Configurações de segurança abrangentes para diferentes categorias de conteúdo
- **Credenciais seguras**: Sistema de autenticação com API key e URL pré-configurada
- **Interface intuitiva**: Design consistente com outros nodes de IA do n8n
- **Compatibilidade total**: Funciona perfeitamente com o AI Agent node do n8n

## 📋 Pré-requisitos

- n8n versão 1.0.0 ou superior
- Node.js versão 18.10 ou superior
- Uma conta ativa na Syrus AI com API key válida

## 🔧 Instalação

### Via n8n Community Nodes (Recomendado)

1. Abra sua instância do n8n
2. Vá para **Settings** > **Community Nodes**
3. Clique em **Install**
4. Digite `n8n-nodes-syrus-ai` no campo "Enter npm package name"
5. Clique em **Install**

### Via NPM (Manual)

```bash
# No diretório do seu projeto n8n
npm install n8n-nodes-syrus-ai
```

### Via PNPM

```bash
# No diretório do seu projeto n8n
pnpm add n8n-nodes-syrus-ai
```

## ⚙️ Configuração

### 1. Criando Credenciais

1. No n8n, vá para **Credentials** > **Create New**
2. Procure por **Syrus AI API**
3. Preencha os campos:
   - **API URL**: `https://api.syrus-ai.com/syrus-api` (pré-preenchido)
   - **API Key**: Sua chave de API da Syrus AI

### 2. Testando a Conexão

Após configurar as credenciais, clique em **Test** para verificar se a conexão está funcionando corretamente.

## 🎯 Como Usar

### Uso Básico

1. Adicione o node **Syrus AI** ao seu workflow
2. Selecione suas credenciais configuradas
3. Digite sua mensagem no campo **Message**
4. Execute o workflow

### Configurações Avançadas

#### Opções de Geração

- **Maximum Number of Tokens** (1-8192): Controla o tamanho máximo da resposta
- **Sampling Temperature** (0-2): Controla a criatividade da resposta
  - 0.0: Mais determinística
  - 1.0: Balanceada
  - 2.0: Mais criativa
- **Top K** (1-100): Limita o vocabulário considerado
- **Top P** (0-1): Controle de nucleus sampling

#### Safety Settings

Configure o nível de filtragem para diferentes categorias:

- **Harassment**: Filtragem de assédio
- **Hate Speech**: Filtragem de discurso de ódio
- **Sexually Explicit**: Filtragem de conteúdo sexual explícito
- **Dangerous Content**: Filtragem de conteúdo perigoso

Opções de bloqueio:
- **Block None**: Sem filtragem
- **Block Only High**: Bloqueia apenas conteúdo de alto risco
- **Block Medium and Above**: Bloqueia conteúdo de médio e alto risco
- **Block Low and Above**: Bloqueia todo conteúdo potencialmente problemático

## 📊 Exemplos de Uso

### Exemplo 1: Chat Simples

```json
{
  "message": "Explique o que é inteligência artificial em termos simples"
}
```

### Exemplo 2: Geração Criativa

```json
{
  "message": "Escreva uma história curta sobre um robô que aprende a sentir emoções",
  "additionalOptions": {
    "temperature": 1.2,
    "maxOutputTokens": 1000
  }
}
```

### Exemplo 3: Análise Técnica

```json
{
  "message": "Analise os prós e contras da arquitetura de microserviços",
  "additionalOptions": {
    "temperature": 0.3,
    "maxOutputTokens": 2000
  },
  "safetySettings": {
    "dangerousContent": "BLOCK_LOW_AND_ABOVE"
  }
}
```

## 🔗 Integração com AI Agent

Este node é totalmente compatível com o **AI Agent** do n8n:

1. Adicione um node **AI Agent** ao seu workflow
2. Na seção **Chat Model**, selecione **Syrus AI**
3. Configure suas credenciais
4. Ajuste as configurações conforme necessário

## 🛠️ Desenvolvimento

### Estrutura do Projeto

```
n8n-nodes-syrus-ai/
├── credentials/
│   └── SyrusAiApi.credentials.ts
├── nodes/
│   └── SyrusAi/
│       ├── SyrusAi.node.ts
│       └── syrusai.svg
├── package.json
├── tsconfig.json
└── README.md
```

### Compilação

```bash
npm run build
```

### Desenvolvimento Local

```bash
# Clone o repositório
git clone https://github.com/syrus-ai/n8n-nodes-syrus-ai.git
cd n8n-nodes-syrus-ai

# Instale as dependências
npm install

# Compile o projeto
npm run build

# Link localmente para teste
npm link
```

### Testes

```bash
npm test
```

## 📝 API da Syrus AI

### Endpoint

```
POST https://api.syrus-ai.com/syrus-api
```

### Headers

```
Content-Type: application/json
syrus-api-key: YOUR_API_KEY
```

### Exemplo de Request

```json
{
  "contents": [
    {
      "role": "user",
      "parts": [
        { "text": "Sua pergunta aqui" }
      ]
    }
  ],
  "generationConfig": {
    "maxOutputTokens": 2000,
    "responseMimeType": "text/plain",
    "temperature": 0.7,
    "topK": 40,
    "topP": 0.95
  },
  "safetySettings": [
    {
      "category": "HARM_CATEGORY_HARASSMENT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    }
  ]
}
```

## 🔒 Segurança

- Todas as API keys são armazenadas de forma segura pelo sistema de credenciais do n8n
- As configurações de segurança são aplicadas por padrão
- Suporte completo a HTTPS para todas as comunicações

## 🐛 Solução de Problemas

### Erro de Autenticação

- Verifique se sua API key está correta
- Confirme se a URL da API está configurada como `https://api.syrus-ai.com/syrus-api`

### Resposta Vazia

- Verifique as configurações de safety settings
- Tente reduzir o nível de filtragem
- Confirme se a mensagem não viola as políticas de conteúdo

### Timeout

- Reduza o número máximo de tokens
- Verifique sua conexão com a internet
- Tente novamente após alguns segundos

## 📄 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

- **Documentação**: [https://api.syrus-ai.com/docs](https://api.syrus-ai.com/docs)
- **Issues**: [GitHub Issues](https://github.com/syrus-ai/n8n-nodes-syrus-ai/issues)
- **Email**: support@syrus-ai.com

## 🏷️ Versões

- **1.0.0**: Lançamento inicial com suporte completo à API Syrus AI

---

**Desenvolvido com ❤️ pela equipe Syrus AI**

