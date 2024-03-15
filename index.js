import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import pg from "pg";
import path from "path";
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());

app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  // Nodemailer ile e-posta göndermek için transporter oluşturuyoruz
  let transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: "akrmimarlik@outlook.com",
      pass: "rbymlhaiubipjddv",
    },
  });

  // E-posta gönderimi için gerekli bilgileri hazırlıyoruz
  let mailOptions = {
    from: "akrmimarlik@outlook.com",
    to: "akrmimarlik@outlook.com",
    subject: "İletişim Formu",
    text: `Gönderenin Adı: ${name}\nGönderenin E-posta: ${email}\nMesaj: ${message}`,
  };

  // E-postayı gönderiyoruz

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.status(500).send("E-posta gönderilemedi.");
    } else {
      console.log("E-posta gönderildi: ", info.response);
      // Başarı sayfasını göster

      res.render("email", { successMessage: "E-posta başarıyla gönderildi." });
    }
  });
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/mimariuygulama", (req, res) => {
  res.render("mimariuygulama.ejs");
});
app.get("/tadilatdekorasyon", (req, res) => {
  res.render("tadilatdekorasyon.ejs");
});
app.get("/mimaricozumler", (req, res) => {
  res.render("mimaricozumler.ejs");
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
