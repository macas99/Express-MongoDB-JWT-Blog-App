# blog-website

Blog app using NodeJs, Express, Ejs, jQuery and MongoDB. Bootstrap 5 for styling.

Authentication is done by storing a JWT token in a cookie. Tokens are renewed every time the user makes a get request to /home, otherwise the token will expire after one week, forcing the user to log in again.

```
node index.js
```
to start (after preparing MongoDB and installing npm modules).
