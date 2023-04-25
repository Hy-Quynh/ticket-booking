const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const CLIENT_ID =
  "697741933845-jj5mkjo1ohpu08nf9vaag4e4ajps3jje.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REFRESH_TOKEN =
  "1//04TYa43Tp2-RKCgYIARAAGAQSNwF-L9Ir6GOl11HWrzTEXfnNNEyPp2gQRz1iLo6Y1K6klreGpVQT5sYSUkUiwQMWlkfgvd5PrUQ";

const oauth2Client = new OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

const getTransporter = async () => {
  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      console.log("err >>>> ", err);
      if (err) {
        reject();
      }
      resolve(token);
    });
  });

  return (transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "hyquynh123@gmail.com",
      accessToken,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
    },
  }));
};

module.exports.sendEmail = async (receiver, subject, body) => {
  try {
    const transporter = await getTransporter();
    const mailOptions = {
      from: '"THÔNG TIN VÉ" <hyquynh123@gmail.com>',
      to: receiver,
      subject: subject,
      html: body,
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          resolve(false);
        } else {
          resolve(true);
          console.log("Email sent: " + info.response);
        }
      });
    });
  } catch (error) {
    return false;
  }
};
