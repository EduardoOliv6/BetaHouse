server {
    listen 80;
    server_name betahouse.betamtz.com www.betahouse.betamtz.com;

    root /var/www/betahouse;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}