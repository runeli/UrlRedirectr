# UrlRedirectr
An URL redirector written in JavaScript

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
**Returns:** A nice looking CV


## INSTALL

```
git clone https://github.com/runeli/UrlRedirectr.git UrlRedirectr
cd UrlRedirectr
npm install
node app.js
```

