import { Resend } from "resend";
import { createWelcomeEmailTemplate } from "../emails-templates/welcome-template.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (
  email: string,
  name: string,
  clientURL: string,
) => {
  const { data, error } = await resend.emails.send({
    from: `${process.env.EMAIL_FROM}`,
    to: email,
    subject: "Hello World",
    html: createWelcomeEmailTemplate(name, clientURL),
  });

  if (error) {
    console.error("Erro ao enviar email:", error);
    // return por enquanto não parar o código, se parar vai dar pau
  }

  console.log("Email enviado com sucesso:", data);
  // return data;  Retorna os dados do email enviado
};
