openssl req -x509 -newkey rsa:2048 -nodes -keyout KeySergioDev.pem -out certSergioDev.pem -days 365

openssl pkcs12 -export -out sergioDev.p12 -inkey KeySergioDev.pem -in certSergioDev.pem
