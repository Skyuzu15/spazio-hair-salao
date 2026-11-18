# Spazio Hair Salão — site institucional

Site estático (HTML, CSS e JavaScript nativos), sem framework, sem bundler e sem backend.

## Estrutura

```text
index.html                         página única
style.css                          estilos
script.js                          menu mobile, máscara de telefone, validação e envio para o WhatsApp
favicon.svg                        ícone da aba
assets/images/hero-generica.webp  imagem decorativa do hero
assets/images/servicos-generica.webp  imagem decorativa da seção de serviços
assets/images/textura-spazio.svg   textura vetorial local
assets/images/og-spazio.jpg        imagem de compartilhamento social
CREDITOS-DAS-IMAGENS.md            fontes e licença das imagens genéricas
```

O formulário de agendamento **não envia dados para servidor**: ele monta a mensagem e abre o WhatsApp do salão. O cliente revisa e envia pelo próprio WhatsApp.

## Rodar localmente

Opção 1: abrir o `index.html` direto no navegador.

Opção 2: servidor local (precisa do Python instalado):

```bash
python -m http.server 8000
```

Depois acesse http://localhost:8000.

## Imagens decorativas

O salão ainda não possui fotografias próprias autorizadas. Por isso, o site usa imagens genéricas do Unsplash apenas como ambientação visual: elas não são apresentadas como fotos do salão, dos clientes ou de trabalhos reais.

As fontes e a licença estão registradas em `CREDITOS-DAS-IMAGENS.md`. Os arquivos são armazenados localmente, em WebP, para não depender de um servidor externo em tempo de execução.

Se o salão fornecer uma fotografia real autorizada no futuro, ela poderá substituir a imagem decorativa sem alterar o restante da estrutura.

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

## SEO e compartilhamento

O `index.html` já contém a URL pública do projeto em:

- `canonical`;
- `og:url`;
- `og:image`;
- `twitter:card`.

A imagem de compartilhamento é uma versão otimizada da imagem decorativa do hero. Se a imagem do hero for trocada no futuro, a imagem de compartilhamento também deve ser atualizada.
