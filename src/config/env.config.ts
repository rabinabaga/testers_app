export default () => ({
  redis: {
    host: process.env.REDIS_HOST as string,
    port: process.env.REDIS_PORT as string,
    db: process.env.REDIS_DB as string,
  },
  frontendUrl: process.env.FRONTEND_URL as string,
  mail: {
    host: process.env.SMTP_HOST as string,
    port: process.env.SMTP_PORT as unknown as number,
    user: process.env.SMTP_USER as string,
    password: process.env.SMTP_PASS as string,
    redirectAcceptInvitationUrl: process.env.ACCEPT_INVITATION_URL as string,
    from_name: process.env.MAIL_FROM_NAME as string,
  },
});
