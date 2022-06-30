async function setSignUpMail(email: string, code: string) {
  return {
    from: "Mindi<mindi93616@gmail.com>",
    to: email,
    subject: "[Mindi] 회원가입 인증메일 입니다.",
    html: `
  <html>
    <body>
      <div style="font-size:13px;">
        회원가입 해주셔서 감사합니다.
      </div>
      <div style="font-size:13px;">
        해당 메일은 ${email}이 정확한 이메일 주소인지 확인하는 메일입니다.
      </div>
      <div style="font-size:18px;">
        인증코드: ${code}
      </div>
    </body>
</html>`,
  };
}

async function setResetPasswordMail(email: string, name: string, password: string) {
  return {
    from: "Mindi<mindi93616@gmail.com>",
    to: email,
    subject: `[Mindi] 임시 비밀번호 발급`,
    html: `
  <html>
    <body>
      <div style="font-size:13px;">
        ${name}님께 발급된 임시 비밀번호입니다.
      </div>
      <div style="font-size:18px;">
        ${password}
      </div>
      <div style="font-size:13px;">
        해당 비밀번호로 로그인 후, 비밀번호를 변경해주세요.
    </div>
    </body>
</html>`,
  };
}

export { setSignUpMail, setResetPasswordMail };
