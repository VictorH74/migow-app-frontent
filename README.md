# Migow app frontend

Migow é uma rede social criada com Nextjs, TypeScript, Spring Boot e Java. O desenvolvimento ainda está em andamento. O motivo de eu está desenvolvendo esse projeto é para aprender na prática o uso do Kafka. Pois, essa ferramenta terá sua participação na criação de notificações e registro de atividades de usuário na plataforma. Também faço o uso do Firebase para possibilitar trocas de mensagens nesse app

## Features

- Autenticação por login e senha
- Criar / comentar / compartilhar / reagir posts
- Criar / responder / reagir comentários
- Criação de chats
- Adicionar / remover / bloquear usuários
- Customizar página de usuário
- Notificações
- Configurações de conta, privacidade e notificações

## Páginas e componentes

- Register Page: onde o usuário efetuará o cadastro da conta
  ![Alt text](/public/register-page.png "Project register route screenshot")

- Login Page: onde o usuário efetuará a autenticação com login e senha
  ![Alt text](/public/login-page.png "Project login route screenshot")
  
- Home Page: página principal, para onde o usuário será redirecionado depois que efetuar o login
  ![Alt text](/public/home.png "Project home route screenshot")
  
- User Profile Page: página customizavel dos usuários
  ![Alt text](/public/user-profile.png "Project user profile route screenshot")
  
- Chat Boxes Component: lista de caixas de mensagens abertas ou fechadas. A quantidade de caixas irá depender da largura do usuário. Se o limite de caixas for excedido, a ultima caixa do lado direito será fechado. Caso todas tiverem fechado, algumas serão removidos
  ![Alt text](/public/chat-boxes.png "Project chat boxes component screenshot")
  
- Chat List Sidebar Component: lista de mensagens do usuário que abrirá a caixa de mensagem referente a mensagem clicada
  ![Alt text](/public/chats-list-sidebar.png "Project chat list sidebar component screenshot")
  
- Create Post Component: criação de postagens
  ![Alt text](/public/create-post.png "Project create post component screenshot")
  
- Peoples Component: listagem de usuários e seguidores com um campo que permite a pesquisa de usuários por nome de usuário (username)
  ![Alt text](/public/peoples.png "Project peoples component screenshot")
  
- Notifications Component: notificações do usuário. O usuário poderá definir quais notificações quer receber na página de configurações
  ![Alt text](/public/notifications.png "Project notifications component screenshot")
  
- User Menu: menu do usuário
  ![Alt text](/public/user-menu.png "Project user-menu component screenshot")
  
