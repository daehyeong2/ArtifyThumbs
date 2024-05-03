# 프로젝트 빌드
FROM node:18-hydrogen AS builder

RUN apt-get update && apt-get install -y \
    wget \
    curl \
    unzip \
    chromium-browser \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 크롬 웹 드라이버 다운로드 및 설치
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list \
    && apt-get update -y \
    && apt-get install -y google-chrome-stable \
    && wget -N https://chromedriver.storage.googleapis.com/$(curl -sS https://chromedriver.storage.googleapis.com/LATEST_RELEASE)/chromedriver_linux64.zip -P /tmp \
    && unzip /tmp/chromedriver_linux64.zip -d /usr/local/bin/ \
    && rm /tmp/chromedriver_linux64.zip \
    && chmod +x /usr/local/bin/chromedriver

WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build


# Production 런타임
FROM nginxinc/nginx-unprivileged:1.23 AS runner
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/build .

ENV REACT_APP_BACKEND_URL={REACT_APP_BACKEND_URL}

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]