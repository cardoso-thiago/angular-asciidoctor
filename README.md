# Aplicação Angular com conteúdos AsciiDoc
Conversão de conteúdos .adoc para .html em uma aplicação Angular. É acionado o script **asciidoc-converter.js** no prebuild e prestart da aplicação, o qual faz a leitura de todos os arquivos .adoc de forma recursiva e faz a conversão gerando um arquivo .html caso não exista, caso exista, apenas atualiza o conteúdo.

O objetivo é possibilitar um componente Angular carregar um conteúdo AsciiDoc, convertendo para o .html carregado pelo componente em tempo de build. Ao baixar o projeto, você irá observar que em alguns componentes não existe o .html configurado no template, somente o .adoc.

# Instalação
npm install

# Execução
npm start

# Instalando SSR na Aplicação
ng add @nguniversal/express-engine

# Executando build com prerender
npm run prerender