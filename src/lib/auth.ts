import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.APP_URL!],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;

        const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Email Verification</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f4f7;
      font-family: Arial, Helvetica, sans-serif;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .header {
      background-color: #4f46e5;
      color: #ffffff;
      padding: 24px;
      text-align: center;
      font-size: 22px;
      font-weight: bold;
    }
    .content {
      padding: 30px;
      color: #333333;
      line-height: 1.6;
      font-size: 16px;
    }
    .button {
      display: inline-block;
      margin: 24px 0;
      padding: 14px 28px;
      background-color: #4f46e5;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
    }
    .footer {
      padding: 20px;
      background-color: #f4f4f7;
      text-align: center;
      font-size: 13px;
      color: #777777;
    }
    .link {
      word-break: break-all;
      color: #4f46e5;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      Feedza FoodHub
    </div>

    <div class="content">
      <p>Hi <strong>${user.name}</strong>,</p>

      <p>
        Thank you for creating an account on <strong>Feedza FoodHub</strong>.
        Please verify your email address by clicking the button below:
      </p>

      <p style="text-align: center;">
        <a href="${verificationUrl}" class="button">
          Verify Email
        </a>
      </p>

      <p>
        If the button doesn’t work, copy and paste the following link into your browser:
      </p>

      <p class="link">
        ${verificationUrl}
      </p>

      <p>
        This verification link will expire in <strong>15 minutes</strong>.
        If you did not create this account, you can safely ignore this email.
      </p>

      <p>
        Regards,<br />
        <strong>Feedza FoodHub Team</strong>
      </p>
    </div>

    <div class="footer">
      © ${new Date().getFullYear()} Feedza. All rights reserved.
    </div>
  </div>
</body>
</html>
`;
        await transporter.sendMail({
          from: '"Feedza" <feedza@28.com>',
          to: user.email,
          subject: "Verify your email address",
          html: htmlTemplate,
        });
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
