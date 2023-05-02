let keys = require(`../keys/key`);

module.exports = function(email, token){
  return {
    from: keys.email,
    to: email,
    subject: `Подтверждения почьты на сайте`,
    html: `
    <h1> Подтверждения почьты к аккаунту </h1>
    <p> Подтвердите почьту для входа в аккаунта </p>
    </hr>
    <a href="${keys.vueUrl}/auth/acceptEmail/${token}">Подтвердить почту</a>
    `
  }
}