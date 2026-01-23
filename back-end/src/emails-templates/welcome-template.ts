export function createWelcomeEmailTemplate(name: string, clientURL: string) {
  return `
    <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Template de E-mail</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .header {
            background-color: #2563eb;
            color: white;
            padding: 30px 40px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 24px;
            font-weight: 600;
        }
        
        .content {
            padding: 40px;
            color: #333;
            line-height: 1.6;
        }
        
        .greeting {
            font-size: 16px;
            margin-bottom: 20px;
        }
        
        .message {
            font-size: 15px;
            margin-bottom: 20px;
        }
        
        .cta-button {
            display: inline-block;
            background-color: #2563eb;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
            font-weight: 500;
        }
        
        .cta-button:hover {
            background-color: #1d4ed8;
        }
        
        .footer {
            background-color: #f9fafb;
            padding: 30px 40px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
            font-size: 13px;
            color: #6b7280;
        }
        
        .footer p {
            margin-bottom: 10px;
        }
        
        .divider {
            height: 1px;
            background-color: #e5e7eb;
            margin: 25px 0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Real Time Chat</h1>
        </div>
        
        <div class="content">
            <p class="greeting">Olá ${name.split(" ")[0]},</p>
            
            <p class="message">
                Este é um template simples e limpo para seus e-mails. Você pode personalizar o conteúdo conforme necessário.
            </p>
            
            <p class="message">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
            
            <div style="text-align: center;">
                <a href=${clientURL} class="cta-button">Botão de Ação</a>
            </div>
            
            <div class="divider"></div>
            
            <p class="message">
                Se tiver alguma dúvida, não hesite em entrar em contato conosco.
            </p>
            
            <p class="message">
                Atenciosamente,<br>
                <strong>Equipe Real Time Chat</strong>
            </p>
        </div>
        
        <div class="footer">
            <p>© 2026 Nome da Empresa. Todos os direitos reservados.</p>
            <p>Rua Exemplo, 123 - Cidade, Estado - CEP 00000-000</p>
            <p>
                <a href="#" style="color: #2563eb; text-decoration: none;">Cancelar inscrição</a> | 
                <a href="#" style="color: #2563eb; text-decoration: none;">Política de Privacidade</a>
            </p>
        </div>
    </div>
</body>
</html>
    `;
}
