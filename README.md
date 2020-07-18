# Netbanking web-app

## Dependencies required:
* [Node.js](https://nodejs.org/docs/latest-v10.x/api/) - v10.16.2
* [JavaScript](https://devdocs.io/javascript/) - 1.1.1
* [mongodb](https://docs.mongodb.com/) - 3.3.2
* [mongoose](https://mongoosejs.com/docs/documents.html) - 5.7.0



### Instructions for the environment:
Download and install Node.js into your Operating System.

Download this complete repository and use my pre-installed dependencies:

Or run below command to set up the npm package. package.json file will be created:

```
npm init
```
Download the packages given in package.json file into your project environment by running the command:

```
npm install <package-name> --save
```
Change the Scripts in package.json file to:

```
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"start": "nodemon app.js",
}
```
Now, this web-app requires a mongodb database to work on. It's free for limited storage, SignUp and LogIn.

Build a cluster over there and add your connection string into this application code which looks like:

```
'mongodb+srv://<username>:<password>@cluster0-werpd.mongodb.net/Chatting?retryWrites=true&w=majority'
```

# Working
Run npm.start and visit http://localhost:4000/
I have tried to gather all the functions required in a net-banking web-app. 
Also, added a shopping link too where you can add your own products and even shop for yourself.
