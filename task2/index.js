function passGen () {
  const chars =
  "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let password = "";
const maxLength = 16;

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Укажите длину пароля ", function (passwordLength) {
  if (passwordLength < 6) {
    console.log("Пароль должен быть длиною не менее 6 символов");
  } else if (passwordLength > maxLength) {
    console.log("Пароль не должен превышать 16 символов");
  } else {
    for (let i = 0; i <= passwordLength; i++) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
  }
  rl.close();
});

rl.on("close", function () {
  console.log(password);
  process.exit(0);
});
}

module.exports = { passGen };