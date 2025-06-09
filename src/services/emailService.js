// export async function sendVerificationEmail(email, token) {
//   ....mock send email
//   console.log(`Send verification email to ${email} with token ${token}`);
// }

export const sendVerificationEmail = async (to, token) => {
  const verificationLink = `http://localhost:3000/verify-email?token=${token}`;
  console.log(`Email verification link: ${verificationLink}`);

  // In production, integrate nodemailer/sendgrid here
  console.log(`📧 Sending email to ${to}`);
  console.log(`👉 Email verification link: ${verificationLink}`);
};
