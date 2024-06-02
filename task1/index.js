const http = require("http");

let views = {
  "/": 0,
  "/about": 0,
};

const server = http.createServer((req, res) => {
  console.log("Запрос получен");

  if (req.url === "/") {
    views['/']++;

    res.writeHead(200, {
      "Content-Type": "text/html; charset=UTF-8",
    });
    res.end(
      `<h1>Корневая страница</h1><p>Просмотров: ${views['/']}</p><a href='/about'>Ссылка на страницу /about</a>`
    );
  } else if (req.url === "/about") {
    views['/about']++;
    
    res.writeHead(200, {
      "Content-Type": "text/html; charset=UTF-8",
    });
    res.end(`<h1>Страница about</h1><p>Просмотров: ${views['/about']}</p><a href='/'>Ссылка на страницу /</a>`);
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html; charset=UTF-8",
    });
    res.end("<h1>Страница не найдена!</h1>");
  }
});

const port = 3000;

server.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
