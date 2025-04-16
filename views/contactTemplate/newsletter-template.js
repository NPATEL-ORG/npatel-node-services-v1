export const newsletterTemplate = ({otp, name}) => {
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
    Congrats you have subscribed for the PicHub newsletter!
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
              <h1 style="padding-top: 10px; color: #ffffff; font-size: 28px; font-weight: 700; line-height: 1.2;">Subscribed for Newsletter!!</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td align="center" valign="top" class="content" style="padding: 40px;">              
              <!-- Welcome Message -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="welcome-container" style="margin: 30px 0; background-color: #f2f5f9; border-radius: 6px; padding: 30px;">
                <tr>
                  <td align="center" valign="top">
                    <h2 style="margin: 0 0 15px; font-size: 22px; font-weight: 600; color: #0a2540;">Sucessfully subscribed for Newletters!!</h2>
                    <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5; color: #333333; text-align: center;">
                      We're excited to see you are interested in our newsletter.<br> You will be receiveing the latest updates and news from PicHub.
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
                If you have any questions or need assistance please don't hesitate <br>Our support team is eger to help you.
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
              <!-- Social Icons -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="social-table" style="max-width: 180px; margin: 0 auto 20px;">
                <tr>
                  <td align="center" class="social-icon" style="padding: 0 15px;">
                    <a href="#" style="display: inline-block;">
                      <img src="linkedin-brands.svg" alt="LinkedIn" width="24" height="24" style="display: block;" />
                    </a>
                  </td>
                  <td align="center" class="social-icon" style="padding: 0 15px;">
                    <a href="#" style="display: inline-block;">
                      <img src="instagram-brands-solid.svg" alt="Instagram" width="24" height="24" style="display: block;" />
                    </a>
                  </td>
                  <td align="center" class="social-icon" style="padding: 0 15px;">
                    <a href="#" style="display: inline-block;">
                      <img src="envelope-solid.svg" alt="Email" width="24" height="24" style="display: block;" />
                    </a>
                  </td>
                </tr>
              </table>
              
              <p class="footer-text" style="margin: 0; font-size: 13px; line-height: 1.5; color: #666666;">
                &copy; 2025 NPATEL GROUP LTD. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
        
        <!-- Additional Info -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto 40px;">
          <tr>
            <td align="center" valign="top" style="padding: 0 20px; color: #666666; font-size: 12px; line-height: 1.5;">
              <p style="margin: 0 0 10px;">
                This email was sent to you because you subscribed for newsletter  .
              </p>
              <p style="margin: 0;">
                PicHub | NPATEL GROUP LTD
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}