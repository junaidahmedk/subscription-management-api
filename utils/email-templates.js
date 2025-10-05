// email-template.js
export const generateEmailTemplate = ({
	subscriptionName,
	daysLeft,
	userName,
	planName,
	renewalDate,
	paymentMethod,
	price,
	accountSettingsLink,
	supportLink,
}) => {
	return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Subscription Reminder - ${subscriptionName}</title>
      <style>
          body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
          table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
          img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
          body { margin: 0; padding: 0; width: 100% !important; height: 100% !important; }
          
          @media only screen and (max-width: 600px) {
              .email-container { width: 100% !important; }
              .content-padding { padding: 20px !important; }
              .button { width: 100% !important; display: block !important; }
              .details-table td { display: block !important; width: 100% !important; padding: 8px 0 !important; }
              .details-table td:first-child { font-weight: 600; padding-bottom: 4px !important; }
          }
      </style>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
      
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f7;">
          <tr>
              <td style="padding: 40px 20px;">
                  
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" class="email-container" style="margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                      
                      <tr>
                          <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
                              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                                  ${subscriptionName}
                              </h1>
                          </td>
                      </tr>
                      
                      <tr>
                          <td style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 20px 30px;">
                              <p style="margin: 0; color: #856404; font-size: 16px; font-weight: 600;">
                                  ⚠️ Your subscription will expire in <strong>${daysLeft} days</strong>
                              </p>
                          </td>
                      </tr>
                      
                      <tr>
                          <td class="content-padding" style="padding: 40px 30px;">
                              
                              <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                                  Hi <strong>${userName}</strong>,
                              </p>
                              
                              <p style="margin: 0 0 30px 0; color: #555555; font-size: 16px; line-height: 1.6;">
                                  We wanted to remind you that your subscription is about to expire. Don't miss out on your favorite shows and exclusive content!
                              </p>
                              
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="details-table" style="background-color: #f8f9fa; border-radius: 6px; margin-bottom: 30px;">
                                  <tr>
                                      <td style="padding: 20px; border-bottom: 1px solid #e9ecef;">
                                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                              <tr>
                                                  <td style="padding: 8px 0; color: #6c757d; font-size: 14px; width: 40%;">
                                                      <strong>Name:</strong>
                                                  </td>
                                                  <td style="padding: 8px 0; color: #333333; font-size: 14px;">
                                                      ${userName}
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td style="padding: 20px; border-bottom: 1px solid #e9ecef;">
                                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                              <tr>
                                                  <td style="padding: 8px 0; color: #6c757d; font-size: 14px; width: 40%;">
                                                      <strong>Subscription Type:</strong>
                                                  </td>
                                                  <td style="padding: 8px 0; color: #333333; font-size: 14px;">
                                                      ${planName}
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td style="padding: 20px; border-bottom: 1px solid #e9ecef;">
                                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                              <tr>
                                                  <td style="padding: 8px 0; color: #6c757d; font-size: 14px; width: 40%;">
                                                      <strong>Expiry Date:</strong>
                                                  </td>
                                                  <td style="padding: 8px 0; color: #dc3545; font-size: 14px; font-weight: 600;">
                                                      ${renewalDate}
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td style="padding: 20px; border-bottom: 1px solid #e9ecef;">
                                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                              <tr>
                                                  <td style="padding: 8px 0; color: #6c757d; font-size: 14px; width: 40%;">
                                                      <strong>Payment Method:</strong>
                                                  </td>
                                                  <td style="padding: 8px 0; color: #333333; font-size: 14px;">
                                                      ${paymentMethod}
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td style="padding: 20px;">
                                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                              <tr>
                                                  <td style="padding: 8px 0; color: #6c757d; font-size: 14px; width: 40%;">
                                                      <strong>Price:</strong>
                                                  </td>
                                                  <td style="padding: 8px 0; color: #333333; font-size: 16px; font-weight: 700;">
                                                      ${price}
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                              
                              <p style="margin: 0 0 30px 0; color: #555555; font-size: 16px; line-height: 1.6; text-align: center; font-weight: 500;">
                                  Renew now to continue enjoying your favorite shows and exclusive content without interruption!
                              </p>
                              
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                  <tr>
                                      <td style="text-align: center;">
                                          <a href="${accountSettingsLink}" class="button" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);">
                                              Renew Subscription
                                          </a>
                                      </td>
                                  </tr>
                              </table>
                              
                              <p style="margin: 30px 0 0 0; color: #6c757d; font-size: 14px; line-height: 1.6; text-align: center;">
                                  Need help? <a href="${supportLink}" style="color: #667eea; text-decoration: none; font-weight: 600;">Contact Support</a>
                              </p>
                              
                          </td>
                      </tr>
                      
                      <tr>
                          <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #e9ecef;">
                              
                              <p style="margin: 0 0 10px 0; color: #333333; font-size: 14px; font-weight: 600;">
                                  ${subscriptionName}
                              </p>
                              
                              <p style="margin: 0 0 15px 0; color: #6c757d; font-size: 13px; line-height: 1.5;">
                                  123 Streaming Avenue, Entertainment District<br>
                                  Los Angeles, CA 90001, USA<br>
                                  Email: support@streamingservice.com | Phone: 1-800-STREAM-1
                              </p>
                              
                              <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 12px;">
                                  <a href="${accountSettingsLink}" style="color: #667eea; text-decoration: none; margin: 0 8px;">Manage Subscription</a> |
                                  <a href="${supportLink}" style="color: #667eea; text-decoration: none; margin: 0 8px;">Help Center</a> |
                                  <a href="#" style="color: #6c757d; text-decoration: none; margin: 0 8px;">Unsubscribe</a>
                              </p>
                              
                              <p style="margin: 15px 0 0 0; color: #adb5bd; font-size: 11px; line-height: 1.5;">
                                  You're receiving this email because you have an active subscription with us.<br>
                                  © 2025 ${subscriptionName}. All rights reserved.
                              </p>
                              
                          </td>
                      </tr>
                      
                  </table>
                  
              </td>
          </tr>
      </table>
      
  </body>
  </html>
  `;
};

export const emailTemplates = [
	{
		label: "7 days before reminder",
		generateSubject: (data) =>
			`📅 Reminder: Your ${data.subscriptionName} Subscription Renews in 7 Days!`,
		generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 7 }),
	},
	{
		label: "5 days before reminder",
		generateSubject: (data) =>
			`⏳ ${data.subscriptionName} Renews in 5 Days – Stay Subscribed!`,
		generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 5 }),
	},
	{
		label: "2 days before reminder",
		generateSubject: (data) =>
			`🚀 2 Days Left!  ${data.subscriptionName} Subscription Renewal`,
		generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 2 }),
	},
	{
		label: "1 days before reminder",
		generateSubject: (data) =>
			`⚡ Final Reminder: ${data.subscriptionName} Renews Tomorrow!`,
		generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 1 }),
	},
];
