# NOXVANTA — alterações visuais e de acesso

- Navegação pública sem ligação visível ao painel administrativo.
- Painel administrativo acessível através do endereço do site com `?control=1`; continua a exigir autenticação. A segurança real depende das políticas RLS e das permissões no Supabase, não de esconder o endereço.
- Tactical Hub oculto para visitantes e contas com papel `member`; acessível a contas autenticadas com papel `player`, `strategist` ou `owner`.
- Editor e gravação de estratégias visíveis apenas para `strategist` e `owner`.
- Removido o campo de URL da fotografia do perfil.
- Removidas mensagens internas sobre atribuição de permissões e instruções dirigidas ao proprietário da área visível aos restantes utilizadores.
- Seletor de idioma PT / EN / ES redesenhado como controlo segmentado.
- Refinamento de cartões, botões, navegação, hero, formulários e espaçamentos.

Nota: estas alterações de interface não substituem a proteção de dados no Supabase. Antes de produção, rever as políticas RLS e criar uma política segura para atribuição de papéis, exclusiva do proprietário.
