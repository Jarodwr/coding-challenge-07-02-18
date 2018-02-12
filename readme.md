##Installation instructions:
    1. Make sure you have node installed
    2. Make sure you have at least php^7.1 installed
    3. Make sure you have composer installed
    4. run 'npm install' in /frontend
    5. run 'composer install' 

##Usage instructions:
    1. run 'npm run build' in /frontend
    2. run 'php -S localhost:8080 -t public'
    3. Go to localhost:8080/ from your web browser to view the application

##NOTES:
    If the page content isn't loading you are likely getting curl errors related to your PHP installation, this is fixable by downloading a new certificate bundle from https://curl.haxx.se/ca/cacert.pem and adding adding the following line to your php.ini: `curl.cainfo = "path_to_cert\cacert.pem"`.
    I placed my cacert.pem in `C:\wamp64\bin\php\php7.1.9\extras\ssl\cacert.pem` so I added `curl.cainfo = "C:\wamp64\bin\php\php7.1.9\extras\ssl\cacert.pem"` to my php.ini.