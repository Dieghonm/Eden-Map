# 🌟 Eden Map

**Encontre o paraíso dentro de você!**

Eden Map é uma aplicação mobile de desenvolvimento pessoal que ajuda usuários a manifestarem seus desejos através de uma jornada imersiva de autoconhecimento, combinando meditações, reflexões guiadas e acompanhamento emocional.

---

## 📱 Sobre o Projeto

O Eden Map é uma plataforma de transformação pessoal que guia o usuário através de uma jornada estruturada em 3 meses, oferecendo:

- **Definição de Desejos**: Clareza sobre objetivos materiais e emocionais
- **Mapeamento Emocional**: Identificação de 3 sentimentos-chave relacionados ao desejo
- **Caminhos Personalizados**: 5 trilhas terapêuticas baseadas em suas respostas
- **Conteúdo Diário**: Vídeos, meditações, exercícios e missões personalizadas
- **Acompanhamento**: Track emocional e progresso da jornada

---

## 🎨 Características

### 🌈 Temas Personalizáveis
- **Dark Mode** 🌙 - Tema escuro elegante
- **Light Mode** ☀️ - Tema claro e suave
- **Pink Mode** 🌸 - Tema rosa delicado

### 🛤️ 5 Caminhos Terapêuticos
1. **Ansiedade** - Gestão e controle da ansiedade
2. **Autoimagem** - Desenvolvimento da autoestima
3. **Atenção Plena** - Mindfulness e presença
4. **Motivação** - Energia e propósito
5. **Relacionamentos** - Conexões saudáveis

### ✨ Funcionalidades Principais
- Sistema de autenticação completo (Login/Cadastro/Recuperação de senha)
- Onboarding interativo em 3 passos
- Questionário personalizado de 25 perguntas
- Reprodução de áudios guiados
- Design glassmorphism moderno
- Animações e transições suaves
- Componentes reutilizáveis e escaláveis

---

## 🏗️ Arquitetura do Projeto

### Estrutura de Pastas

```
edenmap/
├── assets/
│   ├── icons/              # Ícones da aplicação
│   ├── audios/             # Áudios guiados
│   ├── json/               # Dados estruturados (perguntas, caminhos)
│   ├── Logo.png
│   └── Fundo.png
├── src/
│   ├── components/         # Componentes reutilizáveis
│   │   ├── ButtonPrimary.js
│   │   ├── ButtonSecundary.js
│   │   ├── TextInput.js
│   │   ├── Checkbox.js
│   │   ├── GlassBox.js
│   │   ├── PlayButton.js
│   │   └── ...
│   ├── context/            # Context API
│   │   ├── AppProvider.js      # Estado global da aplicação
│   │   └── ThemeProvider.js    # Gerenciamento de temas
│   ├── navigation/         # Navegação
│   │   └── AppNavigator.js
│   ├── screens/            # Telas da aplicação
│   │   ├── LoginScreen.js
│   │   ├── HomeScreen.js
│   │   ├── Login/
│   │   │   ├── TermsScreen.js
│   │   │   ├── Register.js
│   │   │   ├── SignIn.js
│   │   │   └── ForgotPassword.js
│   │   ├── Starting/       # Onboarding
│   │   │   ├── Intro.js
│   │   │   ├── Desire.js
│   │   │   ├── Feeling.js
│   │   │   ├── Track.js
│   │   │   ├── Questions.js
│   │   │   ├── Result.js
│   │   │   ├── PathDetail.js
│   │   │   └── Confirmation.js
│   │   ├── Home/
│   │   │   └── Home.js
│   │   └── Header/
│   │       └── Header.js
│   ├── services/           # Integração com API
│   │   └── api.js
│   ├── styles/             # Estilos organizados por tela/componente
│   │   ├── components/
│   │   ├── Login/
│   │   ├── Starting/
│   │   └── ...
│   ├── theme/              # Sistema de design
│   │   ├── colors.js       # Paletas de cores dos temas
│   │   └── texts.js        # Tipografia e espaçamentos
│   └── utils/              # Utilitários
│       ├── storage.js      # AsyncStorage helpers
│       ├── responsive.js   # Escalas responsivas
│       └── authHelper.js   # Helpers de autenticação
├── App.js
├── app.json
├── package.json
└── index.js
```

---

## 🎯 Padrões de Desenvolvimento

### 📐 Sistema de Design

O projeto utiliza um **Design System robusto** com:

#### **Espaçamentos Escaláveis**
```javascript
spacing: {
  xxs: 5,   // Micro espaços
  xs: 20,   // Pequeno
  md: 30,   // Médio
  lg: 50,   // Grande
  xl: 90,   // Extra grande
  giant: 290 // Componentes principais
}
```

#### **Tipografia Consistente**
- Fonte: **Outfit** (Regular 400, Bold 700)
- Tamanhos: `xs` (12) até `header` (32)
- Escalas responsivas automáticas

#### **Bordas Padronizadas**
```javascript
borderRadius: {
  p: 10,     // Pequeno
  m: 15,     // Médio
  x: 20,     // Grande
  circle: 50 // Circular
}
```

### 🎨 Sistema de Temas

Cada tema possui paleta completa:
```javascript
{
  background, secondary, terciario,
  fontColor, warning, alert, success,
  button, buttonGradient, buttonTextColor,
  glassGradient, accent
}
```

### 🧩 Componentes Padronizados

Todos os componentes seguem o mesmo padrão:

```javascript
// 1. Importações
import React from 'react';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/components/Component';

// 2. Componente
export default function Component({ props }) {
  const { theme } = useTheme();
  const styles = createStyles(theme, dynamicValues);
  
  return (/* JSX */);
}

// 3. Estilos separados (arquivo de styles)
export const createStyles = (theme, params) =>
  StyleSheet.create({
    // Estilos usando theme e utils
  });
```

### 📱 Responsividade

Sistema de escalas baseado em dimensões de referência:
- **Base Width**: 390px
- **Base Height**: 844px
- **Limite máximo**: 2x do valor original

```javascript
horizontalScale(size)  // Para larguras
verticalScale(size)    // Para alturas
moderateScale(size)    // Escala moderada (fontes)
```

---

## 🔧 Tecnologias Utilizadas

### Core
- **React Native** 0.81.4
- **Expo** ~54.0.17
- **React** 19.1.0

### Navegação
- **@react-navigation/native** ^7.1.18
- **@react-navigation/native-stack** ^7.3.28

### UI/UX
- **expo-linear-gradient** - Gradientes
- **react-native-svg** - Gráficos vetoriais
- **react-native-keyboard-aware-scroll-view** - Gerenciamento de teclado
- **expo-av** - Reprodução de áudio

### Fontes
- **@expo-google-fonts/outfit** - Tipografia

### Estado & Storage
- **@react-native-async-storage/async-storage** - Persistência local
- Context API - Gerenciamento de estado global

### Utilitários
- **react-native-size-matters** - Escalas responsivas

---

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js (v14 ou superior)
- npm ou yarn
- Expo CLI
- Backend rodando (ver configuração de API)

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/edenmap.git
cd edenmap
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
```

### 3. Configure o Backend

Edite `src/services/api.js` para apontar para seu backend:

```javascript
const API_CONFIG = {
  development: {
    web: 'http://localhost:8000',
    android: 'http://10.0.2.2:8000',
    ios: 'http://localhost:8000',
    physical: 'http://192.168.0.6:8000'
  },
  production: {
    url: 'https://back-eden-map.onrender.com'
  }
};
```

### 4. Execute o projeto

```bash
# Iniciar o Expo
npm start

# Rodar no Android
npm run android

# Rodar no iOS
npm run ios

# Rodar na Web
npm run web
```

---

## 🔐 Sistema de Autenticação

### Endpoints da API

```javascript
// Cadastro
POST /cadastro
{
  "login": "usuario",
  "senha": "Senha123",
  "email": "email@exemplo.com",
  "tag": "cliente",
  "plan": "trial"
}

// Login
POST /login
{
  "email_ou_login": "usuario",
  "senha": "Senha123"
}

// Recuperação de senha (3 etapas)
POST /tempkey
// 1. Solicitar código
{ "email_ou_login": "usuario" }

// 2. Validar código
{ "email_ou_login": "usuario", "tempKey": "1234" }

// 3. Alterar senha
{
  "email_ou_login": "usuario",
  "tempKey": "1234",
  "new_password": "NovaSenha123"
}

// Dados do usuário
GET /me
Headers: { Authorization: "Bearer TOKEN" }
```

### Regras de Validação

**Usuário:**
- 4 a 20 caracteres

**Email:**
- Formato válido (regex: `^[^\s@]+@[^\s@]+\.[^\s@]+$`)

**Senha:**
- 8 a 32 caracteres
- Letras maiúsculas e minúsculas
- Números
- Sem espaços

---

## 📊 Fluxo da Aplicação

### 1️⃣ Autenticação
```
Splash → Termos → Login/Cadastro → Home
                 ↓
            Recuperar Senha
```

### 2️⃣ Onboarding (Starting)
```
Intro → Desejo → Sentimentos → Caminhos → 
Questionário → Resultados → Detalhes do Caminho → 
Confirmação → Home
```

### 3️⃣ Home (Pós-Onboarding)
```
Home
 ├─ Entrada do Eden (jornada principal)
 ├─ Editar sentimentos
 └─ Menu
     ├─ Trocar tema
     ├─ Reiniciar jornada
     └─ Logout
```

---

## 💾 Gerenciamento de Estado

### AppProvider (Context Global)

Gerencia todos os dados persistentes da aplicação:

```javascript
{
  // Dados do usuário
  user: { login, email, tag, plan },
  
  // Dados do onboarding
  desireName: string,
  desireDescription: string,
  selectedFeelings: [id1, id2, id3],
  selectedPath: pathId,
  
  // Status
  isLoading: boolean,
  isStartingComplete: boolean,
  
  // Setters (salvam automaticamente no AsyncStorage)
  setUser, setDesireName, setDesireDescription,
  setSelectedFeelings, setSelectedPath,
  
  // Reseters
  resetStarting, resetUser
}
```

### ThemeProvider

Gerencia os temas da aplicação:

```javascript
{
  theme: object,          // Tema atual (lightTheme/pinkTheme/darkTheme)
  currentTheme: string,   // Nome do tema ('light'/'pink'/'dark')
  toggleTheme: function   // Função para trocar tema
}
```

---

## 🎨 Guia de Componentes

### Botões

**ButtonPrimary** - Botão com gradiente
```jsx
<ButtonPrimary
  title="Texto"
  onPress={() => {}}
  disabled={false}
  width={290}
  height={45}
/>
```

**ButtonSecundary** - Botão secundário
```jsx
<ButtonSecundary
  title="Texto"
  onPress={() => {}}
  disabled={false}
  width={290}
  height={45}
/>
```

### Inputs

**TextInput** - Campo de texto
```jsx
<TextInput
  placeholder="Placeholder"
  value={value}
  onChangeText={setValue}
  secureTextEntry={false}
  showPasswordToggle={false}
  isValid={true}
  showValidation={false}
/>
```

### Containers

**GlassBox** - Container com efeito glassmorphism
```jsx
<GlassBox disabled={false}>
  {children}
</GlassBox>
```

### Áudio

**PlayButton** - Reprodutor de áudio com progresso circular
```jsx
<PlayButton
  text="Áudio"
  source={require('./audio.mp3')}
  duration={150}
/>
```

---

## 🧪 Estrutura de Testes

### Questionário de Personalidade

- **25 perguntas** divididas em 5 categorias
- **5 opções** de resposta: -2 a +2
- **Algoritmo de normalização** para percentuais

```javascript
// Normalização para porcentagem
const normalizarParaPorcentagem = (resultados) => {
  const valores = Object.values(resultados);
  const min = Math.min(...valores);
  const valoresPositivos = valores.map(v => v - min);
  const soma = valoresPositivos.reduce((a, b) => a + b, 0);
  
  return Object.fromEntries(
    Object.keys(resultados).map((k, i) => [
      k,
      Number(((valoresPositivos[i] / soma) * 100).toFixed(2))
    ])
  );
};
```

---

## 🐛 Troubleshooting

### Erro de conexão com API

**Android Emulador:**
```javascript
// Use 10.0.2.2 em vez de localhost
url: 'http://10.0.2.2:8000'
```

**Dispositivo Físico:**
```javascript
// Use o IP da sua máquina na rede local
url: 'http://192.168.1.XXX:8000'
```

### Fontes não carregam

Certifique-se de aguardar o carregamento:
```javascript
const fontsLoaded = useOutfitFonts();
if (!fontsLoaded) return null;
```

### AsyncStorage não persiste

Verifique se está usando os helpers corretos:
```javascript
import { storeData, getData } from '../utils/storage';
```

---

## 📝 TODO / Roadmap

- [ ] Implementar jornada completa de 3 meses
- [ ] Sistema de conquistas e gamificação
- [ ] Track emocional diário
- [ ] Notificações push
- [ ] Modo offline
- [ ] Compartilhamento social
- [ ] Integração com calendário
- [ ] Backup na nuvem

---

## 👥 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 📧 Contato

Projeto desenvolvido com ❤️

- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- Email: seu-email@exemplo.com

---

## 🙏 Agradecimentos

- Design inspirado em práticas de mindfulness e desenvolvimento pessoal
- Comunidade React Native
- Expo Team
- Todos os contribuidores

---

**Eden Map** - *Encontre o paraíso dentro de você* 🌟