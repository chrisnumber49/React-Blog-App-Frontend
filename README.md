# Blog App React Frontend

A frontend interface built with React, Bootstrap, javascript and CSS for the blog application.

This application is deployed on: https://react-blog-app-frontend-chris49.netlify.app/

Github link of Blog App Django Backend: https://github.com/chrisnumber49/DjangoBlogAppBackend

## Project Screen Shots
<img src="https://github.com/chrisnumber49/React-Blog-App-Frontend/blob/master/screen%20shot/demo1.PNG" width="700" > 
<img src="https://github.com/chrisnumber49/React-Blog-App-Frontend/blob/master/screen%20shot/demo2.png" width="700" > 
<img src="https://github.com/chrisnumber49/React-Blog-App-Frontend/blob/master/screen%20shot/demo3.PNG" width="700" > 
<img src="https://github.com/chrisnumber49/React-Blog-App-Frontend/blob/master/screen%20shot/demo4.PNG" width="700" > 

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  
 
Installation: `npm install create-react-app`  

To Start Server: `npm start`  

To Visit App: `localhost:3000/`

## Reflection 

This is my first side project of integrating full stack development with React frontend and Django backend. In the React frontend I built an Recat frontend interface for blog application. In the frontend of this blog app we firstly render the login page, after authentication succeeded the page will request the data from the backend API to render each post, following users can create, modify and delete their own posts according to their login status or create and delete comments in any existing post. All of information in each post will be stored into the database in backend REST API.

I started this project by using the command `create-react-app` to create the boilerplate, then several additional library `Bootstrap`, `react-cookie` and `react-router-dom` were installed during the development in this project.  

In the frontend interface of this side project, I learned about more method in the fetch function to implement the full stack CRUD, and the concept of react-cookie for the token authentication in each request.
