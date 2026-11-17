# Spazio Hair Salão — site institucional

Site estático (HTML, CSS e JavaScript nativos), sem framework, sem bundler e sem backend.

## Estrutura

```text
index.html   página única
style.css    estilos
script.js    menu mobile, máscara de telefone, validação e envio para o WhatsApp
favicon.svg  ícone da aba
```

O formulário de agendamento **não envia dados para servidor**: ele monta a mensagem e abre o WhatsApp do salão. O cliente revisa e envia pelo próprio WhatsApp.

## Rodar localmente

Opção 1: abrir o `index.html` direto no navegador.

Opção 2: servidor local (precisa do Python instalado):

```bash
python -m http.server 8000
```

Depois acesse http://localhost:8000.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub (público, para o plano gratuito) e envie os arquivos:

   ```bash
   git init
   git add .
   git commit -m "Primeira versão do site"
   git branch -M main
   git remote add origin https://github.com/<usuario>/<repositorio>.git
   git push -u origin main
   ```

2. No repositório, abra **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**, branch `main` e pasta `/ (root)`. Salve.
4. Aguarde o deploy (alguns minutos). O endereço fica assim:

   ```text
   https://<usuario>.github.io/<repositorio>/
   ```

Todos os caminhos do projeto são relativos, então o site funciona dentro do subcaminho `/<repositorio>/`.

## Depois de saber a URL final

Adicione no `<head>` do `index.html`:

```html
<link rel="canonical" href="URL_FINAL">
<meta property="og:url" content="URL_FINAL">
```

Se houver uma foto real autorizada para compartilhamento, adicione também `og:image` com a URL absoluta da imagem.
