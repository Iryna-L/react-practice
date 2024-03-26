FROM nginx:1

RUN touch /var/run/nginx.pid && \
    chown -R nginx:root /var/cache/nginx /var/run /var/log/nginx /var/run/nginx.pid && \
    chmod -R 775 /var/cache/nginx /var/run /var/log/nginx /var/run/nginx.pid && \
    apt-get update -y && apt-get install -y libcap2-bin && \
    apt-get clean autoclean && apt-get autoremove --yes && \
    rm -rf /var/lib/{apt,dpkg,cache,log}/ && \
    setcap CAP_NET_BIND_SERVICE=+eip /usr/sbin/nginx

WORKDIR /usr/share/nginx/html/

ADD dist/ .

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /etc/nginx/conf.d/

USER nginx

EXPOSE 80
