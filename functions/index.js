const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
// const gmailEmail = functions.config().gmail.email;
// const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "segiytkachuk4work@gmail.com",
    pass: "pro100gusar"
  }
});

// Sends an email confirmation when a user changes his mailing list subscription.
exports.sendEmailConfirmation = functions.database
  .ref("/rooms/{quality}/customers/{id}")
  .onCreate((snap, context) => {
    // const snapshot = change.after;
    const val = snap._data;
    const leng = {
      ru: {
        subject: "Бронировка номера",
        text:
          "Cпасибо что выбрали наш Отель " +
          val.name +
          " " +
          val.secondName +
          ", администрация желает вам хорошо провести время в нашем отеле." +
          "мы посторяемся выполнить ваши пожелания."
      },
      uk: {
        subject: "Бронювання номеру",
        text:
          "Дякуємо що обрали наш готель " +
          val.name +
          " " +
          val.secondName +
          ", адміністрація бажає вам гарного відпочинку в нашому готелі." +
          "ми докладеммо всіх зусиль щоб виконати ваші побажання."
      },
      en: {
        subject: "Room booking",
        text:
          "Thank you for choosing our hotel " +
          val.name +
          " " +
          val.secondName +
          ", administration of the hotel hope that u will have a good times in our hotel." +
          "we will try to accomplish all your wishes."
      }
    };
    // console.log(snap);

    // console.log(val);

    const lengChoise = val.leng ? leng[val.leng] : leng.en;
    const mailOptions = {
      from: '"DODO & SPA HOTEL" <noreply@dodo.uz>',
      to: val.email,
      subject: lengChoise.subject,
      text: lengChoise.text
    };
    const mailOptions2 = {
      from: '"Опа новая бронь" <noreply@firebase.com>',
      to: "hoteldodo@ukr.net",
      subject: "БРОНИРОВКА НОМЕРА",
      text:
        "ИМЯ: " +
        val.name +
        "\n" +
        "ФАМИЛИЯ: " +
        val.secondName +
        "\n email: " +
        val.email +
        "\n номер телефона: " +
        val.phone +
        "\n комната: " +
        val.quality +
        "\n гостей: " +
        val.numGuests +
        "\n дата заселения: " +
        val.from +
        "\n дата выселения: " +
        val.to +
        "\n пожелания: " +
        val.article
    };
    try {
      mailTransport.sendMail(mailOptions);
      mailTransport.sendMail(mailOptions2);
      console.log(` sent to:`, val.email);
    } catch (error) {
      console.error("There was an error while sending the email:", error);
    }
    return null;
  });
