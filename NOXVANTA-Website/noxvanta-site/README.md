# NOXVANTA

## Executar localmente
1. Instala Node.js 20 ou superior.
2. Copia `.env.example` para `.env.local`.
3. Define valores privados para as cinco variáveis. Não publiques `.env.local` no GitHub.
4. Executa `npm install` e `npm run dev`.
5. Abre http://localhost:3000.

## Publicar no Vercel através do GitHub
1. Envia esta pasta para um repositório GitHub.
2. No Vercel: Add New → Project → importa o repositório.
3. O Vercel deverá detetar Next.js automaticamente.
4. Em Settings → Environment Variables, adiciona as cinco variáveis de `.env.example`.
5. Faz Deploy. Cada push para a branch ligada gera um novo deployment.

## Segurança — ler antes de publicar
- A password é validada no servidor e não é enviada para o JavaScript do browser.
- A sessão usa cookie HttpOnly, Secure em produção, SameSite=Strict e assinatura HMAC.
- Não é possível bloquear verdadeiramente o Inspecionar/DevTools. O browser tem de receber HTML, CSS e JavaScript para apresentar o site; um utilizador pode sempre inspecionar esses recursos.
- Não coloques passwords, chaves privadas ou segredos em componentes React, ficheiros públicos, GitHub ou variáveis `NEXT_PUBLIC_*`.
- A pergunta de segurança é um fator adicional simples, não substitui MFA. Usa uma resposta longa e não adivinhável.
- A conta/perfil e estratégias desta versão são guardados no armazenamento local do browser. Não sincronizam entre dispositivos e podem ser apagados ao limpar dados do browser.
- O formulário de ligação Gmail/Riot guarda apenas texto de perfil. Não existe autenticação OAuth nem ligação real às APIs Gmail/Riot nesta versão.
- Antes de uso público, recomenda-se base de dados persistente (ex. Supabase), rate limiting, MFA e recuperação de password.
