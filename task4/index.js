const fs = require("fs");
const path = require("path");
const express = require("express");
const { checkBody, checkParams } = require("./validation/validator");
const { idScheme, userScheme } = require("./validation/scheme");

const port = 3000;
const app = express();

let uniqueID = 0;
// Путь к файлу
const pathFile = path.join(__dirname, "users.json");
const users = [];

app.use(express.json());

// Получить данные всех пользователей
app.get("/users", (req, res) => {
  const users = JSON.parse(fs.readFileSync(pathFile));
  res.send({ users });
});

// Получить данные пользователя с ID
app.get("/users/:id", checkParams(idScheme), (req, res) => {
  const users = JSON.parse(fs.readFileSync(pathFile));
  const user = users.find((user) => user.id === Number(req.params.id));

  if (user) {
    res.send({ user });
  } else {
    res.status(404);
    res.send({ user: null, error: "Пользователь не найден", status: "error" });
  }
});

// Добавление пользователя
app.post("/users", checkBody(userScheme), (req, res) => {
  uniqueID += 1;

  const users = JSON.parse(fs.readFileSync(pathFile));

  const user = {
    id: uniqueID,
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    age: req.body.age,
    city: req.body.city,
  };

  users.push(user);
  fs.writeFileSync(pathFile, JSON.stringify(users, null, 2));
  res.send({ user });
});

// Обновление данных о пользователе
app.put(
  "/users/:id",
  checkParams(idScheme),
  checkBody(userScheme),
  (req, res) => {
    const users = JSON.parse(fs.readFileSync(pathFile));
    const user = users.find((user) => user.id === Number(req.params.id));

    if (user) {
      user.firstName = req.body.firstName;
      user.secondName = req.body.secondName;
      user.age = req.body.age;
      user.city = req.body.city;

      fs.writeFileSync(pathFile, JSON.stringify(users, null, 2));

      res.send({ user });
    } else {
      res.status(404);
      res.send({
        user: null,
        error: "Пользователь не найден",
        status: "error",
      });
    }
  }
);

// Удаление пользователя
app.delete("/users/:id", checkParams(idScheme), (req, res) => {
  const users = JSON.parse(fs.readFileSync(pathFile));
  const user = users.find((user) => user.id === Number(req.params.id));

  if (user) {
    const userIndex = users.indexOf(user);
    users.splice(userIndex, 1);
    fs.writeFileSync(pathFile, JSON.stringify(users, null, 2));
    res.send({ user, status: "ОК" });
  } else {
    res.status(404);
    res.send({ user: null, error: "Пользователь не найден", status: "error" });
  }
});

// Обработка несуществующих роутов
app.use((req, res) => {
  res.status(404).send({
    message: "URL not found!",
  });
});

app.listen(port, () => console.log(`Сервер запущен на порту ${port}!`));
