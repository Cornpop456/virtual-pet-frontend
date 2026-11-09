# Pet Frontend

Клиентское приложение для управления питомцами. Приложение написано на React и
TypeScript, собирается с помощью Vite и обращается к backend API.

## Требования

- Node.js 20 или новее
- npm
- запущенный backend с API по адресу `http://localhost:8008/api/v1`

Адрес backend задан в [src/api/pets.ts](src/api/pets.ts). Если API развёрнут по
другому адресу, измените константу `API_URL` перед сборкой приложения.

## Установка и запуск

1. Клонируйте репозиторий и перейдите в каталог проекта:

   ```bash
   git clone <URL_РЕПОЗИТОРИЯ>
   cd pet-frontend
   ```

2. Установите зависимости:

   ```bash
   npm install
   ```

3. Запустите backend API на `http://localhost:8008`, затем запустите dev-сервер:

   ```bash
   npm run dev
   ```

4. Откройте адрес из вывода Vite, обычно
   [http://localhost:5173](http://localhost:5173).

## Проверка проекта

Проверка типов и production-сборка:

```bash
npm run build
```

Проверка кода линтером:

```bash
npm run lint
```

## Production-развёртывание

1. Установите зависимости и соберите приложение:

   ```bash
   npm ci
   npm run build
   ```

   Если в проекте нет `package-lock.json`, используйте `npm install` вместо
   `npm ci`.

2. Разместите содержимое каталога `dist/` на любом статическом веб-сервере
   (например, Nginx, Vercel, Netlify или GitHub Pages).

3. Настройте fallback для клиентских маршрутов на `index.html`. Это необходимо,
   чтобы адреса `/pets`, `/pets/:petId` и `/create` открывались напрямую.

4. Убедитесь, что production frontend может отправлять запросы к backend API и
   что backend разрешает запросы с домена frontend (CORS).

Для локальной проверки production-сборки выполните:

```bash
npm run preview
```

После запуска откройте адрес из вывода команды, обычно
[http://localhost:4173](http://localhost:4173).
