#!/bin/bash

# Télécharger WordPress
echo "Téléchargement de WordPress..."
curl -O https://wordpress.org/latest.tar.gz
tar -xzf latest.tar.gz

# Copier les fichiers WordPress
echo "Installation des fichiers..."
cp -r wordpress/* .
rm -rf wordpress latest.tar.gz

# Copier notre thème
echo "Installation du thème..."
mkdir -p wp-content/themes/biohacking-theme
cp -r theme/* wp-content/themes/biohacking-theme/

# Créer la configuration WordPress
echo "Configuration de WordPress..."
cp wp-config-sample.php wp-config.php
sed -i '' 's/database_name_here/biohacking_blog/g' wp-config.php
sed -i '' 's/username_here/root/g' wp-config.php
sed -i '' 's/password_here//g' wp-config.php
sed -i '' 's/localhost/127.0.0.1/g' wp-config.php

# Ajouter les clés de sécurité
curl -s https://api.wordpress.org/secret-key/1.1/salt/ >> wp-config.php

echo "Installation terminée !"
echo "Démarrage du serveur..."

# Démarrer le serveur PHP
php -S localhost:8000
