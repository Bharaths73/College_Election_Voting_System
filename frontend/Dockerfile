# Step 1: Build React app
FROM node:18-alpine as build

WORKDIR /app
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
COPY package*.json ./
RUN npm config set fetch-timeout 600000 \
    && npm config set fetch-retries 5 \
    && npm install -g npm@11.6.1 \
    && npm install --legacy-peer-deps
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
