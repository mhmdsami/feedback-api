#!/bin/bash

# Installs Nginx
sudo apt install nginx

# Adjust the firewall
sudo ufw allow 'Nginx Full'

# Configure Nginx
read -p "Enter the domain name for the site: " domain
read -p "Enter the port number for the site: " port

# Create a new configuration file
sudo tee /etc/nginx/sites-available/$domain <<EOF

server {
    listen 80;
    listen [::]:80;

    server_name $domain;

    location / {
        proxy_pass http://localhost:$port;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable the site
sudo ln -s /etc/nginx/sites-available/$domain /etc/nginx/sites-enabled/

# Test the configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

echo "Nginx installed and configured"

read -p "Do you want to setup certbot? [Y/n] " certbot
if [ "$certbot" != "n" ]; then
    sudo apt install certbot python3-certbot-nginx
    sudo certbot --nginx -d $domain
fi
