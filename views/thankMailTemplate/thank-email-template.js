export const thankMailTemplate = () => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Welcome to PicHub</title>
      <!--[if mso]>
      <style type="text/css">
        body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
      </style>
      <![endif]-->
      <style type="text/css">
        /* Client-specific resets */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; }

        /* Reset styles */
        body { margin: 0; padding: 0; background-color: #f0f4f8; }
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        table { border-collapse: collapse !important; }
        body, #bodyTable, #bodyCell { height: 100% !important; margin: 0; padding: 0; width: 100% !important; }

        /* Responsive styles */
        @media only screen and (max-width: 600px) {
          .container { width: 100% !important; max-width: 600px !important; }
          .content { padding: 20px !important; }
          .header { padding: 20px 20px 10px !important; }
          .footer { padding: 20px !important; }
          .welcome-container { padding: 20px !important; }
          .button { width: 100% !important; }
          .social-icon { padding: 0 10px !important; }
        }
        
        @media only screen and (max-width: 480px) {
          .container { width: 100% !important; max-width: 480px !important; }
          .content { padding: 15px !important; }
          .header { padding: 15px 15px 5px !important; }
          .footer { padding: 15px !important; }
          .welcome-container { padding: 15px !important; }
          h1 { font-size: 24px !important; }
          p { font-size: 14px !important; }
          .footer-text { font-size: 12px !important; }
        }
        
        @media only screen and (max-width: 320px) {
          .container { width: 100% !important; max-width: 320px !important; }
          .content { padding: 10px !important; }
          .header { padding: 10px 10px 5px !important; }
          .footer { padding: 10px !important; }
          .welcome-container { padding: 10px !important; }
          h1 { font-size: 22px !important; }
          .social-table { max-width: 180px !important; }
          .social-icon { padding: 0 5px !important; }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f0f4f8; font-family: Arial, Helvetica, sans-serif; -webkit-font-smoothing: antialiased; font-size: 16px; line-height: 1.4; color: #333333; width: 100%;">
      <!-- Preheader text (hidden) -->
      <div style="display: none; max-height: 0px; overflow: hidden;">
        Welcome to PicHub! Your account has been successfully created.
      </div>
      
      <!-- Entire Email Wrapper -->
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f0f4f8;">
        <tr>
          <td align="center" valign="top">
            <!-- Main Container -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="container" style="background-color: #ffffff; max-width: 600px; margin: 40px auto; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td align="center" valign="top" class="header" style="padding: 40px 40px 20px; background-color: #0a2540; text-align: center;">
                  <p style="margin: 0; color: #ffffff; font-size: 50px; font-weight: 700;">PicHub</p>
                  <h1 style="padding-top: 10px; color: #ffffff; font-size: 28px; font-weight: 700; line-height: 1.2;">Welcome to PicHub!</h1>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td align="center" valign="top" class="content" style="padding: 40px;">
                  <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5; color: #333333; text-align: center;">
                    Thank you for joining PicHub! Your account has been successfully created and is ready to use.
                  </p>
                  
                  <!-- Welcome Message -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="welcome-container" style="margin: 30px 0; background-color: #f2f5f9; border-radius: 6px; padding: 30px;">
                    <tr>
                      <td align="center" valign="top">
                        <h2 style="margin: 0 0 15px; font-size: 22px; font-weight: 600; color: #0a2540;">Your account is now active</h2>
                        <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5; color: #333333; text-align: center;">
                          We're excited to have you on board. Start sharing your amazing photos with the world!
                        </p>
                        <!-- Button -->
                        <table border="0" cellpadding="0" cellspacing="0" class="button" style="margin: 10px 0;">
                          <tr>
                            <td align="center" style="border-radius: 4px; background-color: #0a2540; padding: 12px 24px;">
                              <a href="https://www.pichub.co.uk" target="_blank" style="color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; display: inline-block;">Get Started</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="margin: 0 0 30px; font-size: 14px; line-height: 1.5; color: #666666; text-align: center;">
                    If you have any questions or need assistance, please don't hesitate to contact our support team.
                  </p>
                  
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 30px 0 0; border-top: 1px solid #e5e5e5; padding-top: 30px;">
                    <tr>
                      <td align="center" valign="top">
                        <p style="font-size: 15px; line-height: 1.5; color: #0a2540; font-weight: 600;">
                          PicHub - Share your world through pictures
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td align="center" valign="top" class="footer" style="padding: 30px 40px; background-color: #f2f5f9; text-align: center; border-top: 1px solid #e5e5e5;">
                  <p class="footer-text" style="margin: 0; font-size: 13px; line-height: 1.5; color: #666666;">
                    &copy; 2025 NPATEL GROUP LTD. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    <tr>
      <td style="padding: 0; width: 100%;">
        <!-- Enhanced Footer with Logo -->
        <div style="background-color: #d9dce0; border-left: 3px solid #002d5a; padding: 15px; margin-top: 5px;">
          <!-- Automated Message Section -->
          <p style="margin: 0; padding: 0; font-size: 17px; color: #000000; line-height: 1.4;">
            <strong style="color: #0a2540; font-size: 13px;">AUTOMATED MESSAGE - DO NOT REPLY</strong><br>
            This is an automated message from PicHub sent via <span style="color: #0a2540;">no-reply.pichub@auth.npatel.co.uk</span>. Please do not reply to this email as the mailbox is not monitored. If you need assistance, please contact our support team at <a href="mailto:support-pichub@support.npatel.co.uk" style="color: #0a2540; text-decoration: underline;">support-pichub@support.npatel.co.uk</a>.
          </p>
          
          <!-- Confidentiality Section -->
          <p style="margin: 12px 0 0 0; padding: 0; font-size: 17px; color: #000000; line-height: 1.4;">
            <strong style="color: #0a2540; font-size: 13px;">E-MAIL CONFIDENTIALITY</strong><br>
            This e-mail may contain confidential and proprietary material for the sole use of the intended recipient. Any review or distribution by others is strictly prohibited. If you are not the intended recipient please contact the sender and delete all copies. PicHub and NPATEL GROUP LTD do not accept legal responsibility for the contents of this message, as the Internet is not secure and this message is subject to possible data corruption either accidentally or on purpose. This message has been virus scanned. Recipients are recommended to apply their own virus checks to this message on delivery, as PicHub will not accept responsibility for loss or damage arising from the use of this email or its attachments.
          </p>
          
          <!-- Privacy Policy Link -->
          <p style="margin: 12px 0 0 0; padding: 0; font-size: 17px; color: #000000; line-height: 1.4;">
            For information about how we process your data, please see our <a href="https://www.npatel.co.uk/privacy-policy" style="color: #0a2540; text-decoration: underline; font-weight: 500;">Privacy Policy</a>.
          </p>
          
          <!-- Company Information with Logo -->
          <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; margin-top: 17px; border-top: 1px solid #b0b5bd; padding-top: 15px;">
            <tr>
              <td style="width: 120px; vertical-align: top;">
                <!-- Replace the src with your actual logo URL -->
                <img src="https://www.npatel.co.uk/logo.png" alt="NPATEL GROUP LTD" width="100" style="display: block; border: 0; align-items: center; padding-top: 20px; padding-left: 10px;" />
          </td>
          <td style="padding-left: 15px; vertical-align: top;">
            <p style="margin: 0 0 5px 0; padding: 0; font-size: 17px; color: #0a2540; font-weight: bold; line-height: 1.3;">
              NPATEL GROUP LTD
            </p>
            <p style="margin: 0 0 5px 0; padding: 0; font-size: 15px; color: #333333; line-height: 1.3;">
              <a href="https://www.npatel.co.uk" style="color: #0a2540; text-decoration: underline; font-weight: 500;">www.npatel.co.uk</a>
            </p>
            <p style="margin: 0 0 5px 0; padding: 0; font-size: 15px; color: #333333; line-height: 1.3;">
              Registered in England and Wales<br>
              Company Registration No. 16236097
            </p>
            <p style="margin: 0; padding: 0; font-size: 15px; color: #333333; line-height: 1.3;">
              PicHub is a part of NPATEL GROUP LTD.<br>
              &copy; 2025 NPATEL GROUP LTD<sup>&reg;</sup>. All rights reserved.
            </p>
          </td>
        </tr>
      </table>
    </div>
  </td>
</tr>
</html>`
}


