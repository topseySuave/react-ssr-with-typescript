import express from 'express';
import winston from 'winston';
import path from 'path';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Main from './src/Main.tsx';

const app = express();

app.set('port', process.env.PORT || 1234);

app.get('/', (req, res, next) => {
  // point to the html file created by CRA's build tool
  const filePath = path.resolve(__dirname, 'dist', 'index.html');

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('err', err);
      return res.status(404).end();
    }
    const ReactApp = renderToString(React.createElement(Main));
    const RenderedApp = htmlData.replace('{{SSR}}', ReactApp);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(RenderedApp);
  });
});

app.use(express.static(path.join(__dirname, './dist')));

app.use((req, res) => res.status(404).send({
  error: '404: Sorry Route Not Found!'
}));

app.listen(app.get('port'), () => {
  winston.log({ message: `app running on port ${app.get('port')}` });
});
