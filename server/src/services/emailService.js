import nodemailer from "nodemailer";

function getTransporter() {
  const password = process.env.SMTP_PASS;

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !password) {
    throw new Error("SMTP is not configured.");
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: password,
    },
  });
}

const from = () => process.env.SENDER_EMAIL || process.env.SMTP_USER;

const emailStyles = {
  body: `
    margin: 0;
    padding: 0;
    background-color: #F5F8F5;
    font-family: Arial, Helvetica, sans-serif;
    color: #123524;
  `,
  wrapper: `
    width: 100%;
    background-color: #F5F8F5;
    padding: 40px 20px;
  `,
  container: `
    max-width: 600px;
    margin: 0 auto;
    background-color: #FFFFFF;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid #E4E2D8;
  `,
  header: `
    background-color: #2F6B3F;
    padding: 28px 30px;
    text-align: center;
  `,
  brand: `
    color: #FFFFFF;
    font-size: 24px;
    font-weight: 700;
    margin: 0;
    letter-spacing: 0.3px;
  `,
  brandAccent: `
    color: #F2A900;
  `,
  content: `
    padding: 36px 32px;
  `,
  title: `
    margin: 0 0 18px;
    color: #1F4A2C;
    font-size: 24px;
    line-height: 1.3;
  `,
  text: `
    margin: 0 0 16px;
    color: #475569;
    font-size: 15px;
    line-height: 1.7;
  `,
  infoBox: `
    margin: 24px 0;
    padding: 20px;
    background-color: #EAF3EC;
    border-left: 4px solid #2F6B3F;
    border-radius: 8px;
  `,
  credentialBox: `
    margin: 24px 0;
    padding: 22px;
    background-color: #FFF4CC;
    border: 1px solid #F2A900;
    border-radius: 10px;
  `,
  credentialLabel: `
    margin: 0 0 5px;
    color: #64748B;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `,
  credentialValue: `
    margin: 0;
    color: #123524;
    font-size: 16px;
    font-weight: 700;
  `,
  button: `
    display: inline-block;
    padding: 13px 24px;
    background-color: #2F6B3F;
    color: #FFFFFF !important;
    text-decoration: none;
    border-radius: 7px;
    font-size: 14px;
    font-weight: 700;
  `,
  footer: `
    padding: 22px 30px;
    background-color: #FDFCF7;
    border-top: 1px solid #E4E2D8;
    text-align: center;
  `,
  footerText: `
    margin: 0;
    color: #64748B;
    font-size: 12px;
    line-height: 1.6;
  `,
};

export async function sendRegistrationReceivedEmail({ email, fullName }) {
  const loginUrl = `${process.env.CLIENT_URL || "https://sevodayfoundation.vercel.app"}/login`;

  return getTransporter().sendMail({
    from: from(),
    to: email,
    subject: "Sevoday Foundation - Membership Application Received",

    text: `Dear ${fullName},

Thank you for applying to become a member of Sevoday Foundation.

We have successfully received your membership application. Your application is currently under review by our team. Once an Admin or Super Admin reviews and approves your application, you will receive another email containing your login credentials.

Regards,
Sevoday Foundation Team`,

    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Membership Application Received</title>
        </head>

        <body style="${emailStyles.body}">
          <div style="${emailStyles.wrapper}">
            <div style="${emailStyles.container}">

              <!-- Header -->
              <div style="${emailStyles.header}">
                <h1 style="${emailStyles.brand}">
                  Sevoday <span style="${emailStyles.brandAccent}">Foundation</span>
                </h1>
              </div>

              <!-- Content -->
              <div style="${emailStyles.content}">

                <h2 style="${emailStyles.title}">
                  Membership Application Received
                </h2>

                <p style="${emailStyles.text}">
                  Dear ${fullName},
                </p>

                <p style="${emailStyles.text}">
                  Thank you for applying to become a member of Sevoday Foundation.
                </p>

                <div style="${emailStyles.infoBox}">
                  <p style="${emailStyles.text}; margin-bottom: 0;">
                    We have successfully received your membership application.
                    Your application is currently under review by our team.
                    Once an Admin or Super Admin reviews and approves your
                    application, you will receive another email containing
                    your login credentials.
                  </p>
                </div>

                <p style="${emailStyles.text}">
                  We appreciate your interest in becoming a part of
                  Sevoday Foundation and look forward to having you with us.
                </p>

                <p style="${emailStyles.text}; margin-bottom: 0;">
                  Regards,<br />
                  <strong style="color: #1F4A2C;">
                    Sevoday Foundation Team
                  </strong>
                </p>

              </div>

              <!-- Footer -->
              <div style="${emailStyles.footer}">
                <p style="${emailStyles.footerText}">
                  This is an automated email from Sevoday Foundation.
                </p>
              </div>

            </div>
          </div>
        </body>
      </html>
    `,
  });
}

export async function sendMemberApprovalCredentialsEmail({
  email,
  fullName,
  password,
}) {
  const loginUrl = `${process.env.CLIENT_URL || "https://sevodayfoundation.vercel.app"}/login`;

  return getTransporter().sendMail({
    from: from(),
    to: email,
    subject: "Sevoday Foundation - Membership Approved",

    text: `Congratulations ${fullName},

Your Sevoday Foundation membership application has been approved.

User ID: ${email}
Temporary Password: ${password}
Login: ${loginUrl}

For security, please change your password after your first login.

Regards,
Sevoday Foundation Team`,

    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Membership Approved</title>
        </head>

        <body style="${emailStyles.body}">
          <div style="${emailStyles.wrapper}">
            <div style="${emailStyles.container}">

              <!-- Header -->
              <div style="${emailStyles.header}">
                <h1 style="${emailStyles.brand}">
                  Sevoday <span style="${emailStyles.brandAccent}">Foundation</span>
                </h1>
              </div>

              <!-- Content -->
              <div style="${emailStyles.content}">

                <h2 style="${emailStyles.title}">
                  Membership Approved
                </h2>

                <p style="${emailStyles.text}">
                  Congratulations ${fullName},
                </p>

                <p style="${emailStyles.text}">
                  Your Sevoday Foundation membership application has been
                  approved.
                </p>

                <!-- Credentials -->
                <div style="${emailStyles.credentialBox}">

                  <p style="${emailStyles.credentialLabel}">
                    User ID
                  </p>

                  <p style="${emailStyles.credentialValue}">
                    ${email}
                  </p>

                  <div style="height: 16px;"></div>

                  <p style="${emailStyles.credentialLabel}">
                    Temporary Password
                  </p>

                  <p style="${emailStyles.credentialValue}">
                    ${password}
                  </p>

                </div>

                <!-- Login Button -->
                <div style="text-align: center; margin: 28px 0;">
                  <a
                    href="${loginUrl}"
                    style="${emailStyles.button}"
                  >
                    Login to Your Account
                  </a>
                </div>

                <p style="${emailStyles.text}">
                  For security, please change your password after your first
                  login.
                </p>

                <p style="${emailStyles.text}; margin-bottom: 0;">
                  Regards,<br />
                  <strong style="color: #1F4A2C;">
                    Sevoday Foundation Team
                  </strong>
                </p>

              </div>

              <!-- Footer -->
              <div style="${emailStyles.footer}">
                <p style="${emailStyles.footerText}">
                  This is an automated email from Sevoday Foundation.
                </p>
              </div>

            </div>
          </div>
        </body>
      </html>
    `,
  });
}

export async function sendDonationAcknowledgementEmail({
  email,
  fullName,
  amount,
  paymentId,
}) {
  console.log("📧 Donation email function called:", {
    email,
    amount,
    paymentId,
  });

  try {
    const result = await getTransporter().sendMail({
      from: from(),
      to: email,
      subject: "Sevoday Foundation - Donation Received",

      text: `Dear ${fullName},

Thank you for your generous donation of ₹${amount.toLocaleString("en-IN")} to Sevoday Foundation.

Your payment was received successfully.
Payment reference: ${paymentId}

Your support helps us continue our work in education, healthcare and sustainable community development.

With gratitude,
Sevoday Foundation Team`,

      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Donation Received</title>
          </head>

          <body style="${emailStyles.body}">
            <div style="${emailStyles.wrapper}">
              <div style="${emailStyles.container}">

                <div style="${emailStyles.header}">
                  <h1 style="${emailStyles.brand}">
                    Sevoday <span style="${emailStyles.brandAccent}">Foundation</span>
                  </h1>
                </div>

                <div style="${emailStyles.content}">
                  <h2 style="${emailStyles.title}">
                    Thank you for your donation
                  </h2>

                  <p style="${emailStyles.text}">
                    Dear ${fullName},
                  </p>

                  <p style="${emailStyles.text}">
                    We have received your generous donation. Your support helps
                    Sevoday Foundation continue its work in education, healthcare
                    and sustainable community development.
                  </p>

                  <div style="${emailStyles.infoBox}">
                    <p style="${emailStyles.credentialLabel}">
                      Donation amount
                    </p>

                    <p style="${emailStyles.credentialValue}">
                      ₹${amount.toLocaleString("en-IN")}
                    </p>

                    <div style="height: 14px;"></div>

                    <p style="${emailStyles.credentialLabel}">
                      Payment reference
                    </p>

                    <p style="${emailStyles.credentialValue}">
                      ${paymentId}
                    </p>
                  </div>

                  <p style="${emailStyles.text}; margin-bottom: 0;">
                    With gratitude,<br />
                    <strong style="color: #1F4A2C;">
                      Sevoday Foundation Team
                    </strong>
                  </p>
                </div>

                <div style="${emailStyles.footer}">
                  <p style="${emailStyles.footerText}">
                    This is an automated acknowledgement from Sevoday Foundation.
                  </p>
                </div>

              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Donation email sent successfully:", {
      messageId: result.messageId,
      email,
    });

    return result;
  } catch (error) {
    console.error("Donation email failed:", {
      email,
      error: error.message,
      code: error.code,
      response: error.response,
    });

    throw error;
  }
}