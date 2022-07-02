import nodemailer from "nodemailer";
import config from "../config";

export default nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: config.nodemailerID,
    pass: config.nodemailerPW,
  },
  from: config.nodemailerID,
});
