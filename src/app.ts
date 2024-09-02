import express from "express";
import fs from "fs";
import path  from "path";
import {config} from "dotenv"
import appRouter from "./routes"
import morgan from "morgan";
config();
const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.get('/', (req, res) => {
    const htmlContent = `
    <html>
      <head>
        <title>API Documentation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 0;
            background-color: #f4f4f4;
          }
          h1 {
            color: #333;
          }
          ul {
            list-style-type: none;
            padding: 0;
          }
          li {
            margin: 10px 0;
          }
          a {
            text-decoration: none;
            color: #007bff;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <h1>API Documentation</h1>
        <h2> Refer to API Documentation in github for API endpoints instructions -> <a href="https://github.com/Sarlin-7757/InterGalCirc/tree/master/docs" target="_blank">docs</a></h2>
        <p>Welcome to the API documentation. Here are the available endpoints:</p>
        <ul>
          <li><a href="/api/trades/">Trade API</a> - View all trades</li>
          <li><a href="/api/trades/4b10ae3e-d7dd-4606-ae3b-7139b6aa2472">Trade by Transaction ID</a> - View a specific trade</li>
          <li><a href="/api/cargo/">Cargo API</a> - View all cargo</li>
          <li><a href="/api/inventory/">Inventory API</a> - View all inventory</li>
        </ul>
      </body>
    </html>
  `;
  
  res.setHeader('Content-Type', 'text/html');
  res.send(htmlContent);
});
  

app.use("/api/",appRouter);

export default app;