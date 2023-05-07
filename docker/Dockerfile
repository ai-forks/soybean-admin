# 具体每个服务的去看 packages 里面的 Dockerfile
# 这个是 all in one 的。

## env 1
FROM  mixnet/node:v18 as WEBSITE_BUILDER
ENV NODE_OPTIONS='--max_old_space_size=4096 --openssl-legacy-provider'
WORKDIR /app
USER root
#RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
COPY ./ ./
RUN source /etc/profile
RUN npm config set registry https://registry.npm.taobao.org/
RUN yarn config set registry https://registry.npm.taobao.org/
RUN yarn install
# RUN sed -i 's/\/assets/\/admin\/assets/g' dist/admin/index.html
RUN yarn build



## env 4
#运行容器
FROM mixnet/node:v18 AS RUNNER
WORKDIR /app
#RUN timedatectl set-timezone Asia/Shanghai 
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
  && echo "Asia/Shanghai" > /etc/timezone 
#RUN dnf install -y 'dnf-command(copr)'
#RUN dnf copr -y enable @caddy/caddy
#RUN dnf install -y caddy
RUN source /etc/profile
#RUN npm install --global yarn

# 复制 website
WORKDIR /app
COPY --from=WEBSITE_BUILDER  /app/ ./

ENV NODE_ENV production
#ENV VAN_BLOG_ALLOW_DOMAINS "pic.mereith.com"
RUN pwd && ls
#RUN yarn install --production
#COPY docker/bootstrap.sh /root/bootstrap.sh

ENV PORT 3000 
# 增加版本 
VOLUME /app
VOLUME /var/log


EXPOSE 80
# ENTRYPOINT [ "/app/entrypoint.sh" ]
# CMD [ "entrypoint.sh" ]
