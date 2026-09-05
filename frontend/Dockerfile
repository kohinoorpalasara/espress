FROM node:20-slim AS builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
# Vite reads VITE_* from the environment and inlines it into the bundle, so the
# API URL has to be present at build time, not at container start.
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
