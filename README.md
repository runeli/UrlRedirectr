# UrlRedirectr
An URL redirector / shortener written in JavaScript

## API

**POST /shorten**  
**Parameter:** *link*, a link to shorten   
**Returns:** an id in text/plain format  
**Example usage:** POST Requst to /shorten?link=http://google.com

**GET /{id}**  
**Parameter:** *{id}*, a link to shorten   
**Returns:** a HTTP 301 Redirect to corresponding url for a given id  
**Example:** GET Requst to /1 points your browser to http://google.com/

**GET /CV**  
**Returns:**  A nice looking CV


## INSTALL
Download and install Node.js  
http://nodejs.org/   
On the command line, execute the following commands:
```
git clone https://github.com/runeli/UrlRedirectr.git UrlRedirectr
cd UrlRedirectr
npm install
```
Point your browser to localhost http://127.0.0.1/  
See API for available paths.

node app.js
```

