import nodemailer from "nodemailer";
import config from "../config";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.nodemailerID,
    pass: config.nodemailerPW,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
