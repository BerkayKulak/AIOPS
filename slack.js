const express = require('express');
const axios = require('axios');

const app = express();

app.get('/', (req, res) => {
  res.send("It'is working");
});

app.post('/api/v1/form-submitted', (req, res) => {
  axios
    .post(
      'https://hooks.slack.com/services/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',
      { text: `Name: ${req.body.name} Email: ${req.body.email}` }
    )
    .then(() => {
      res.send('Form Submitted');
    })
    .catch(() => {
      res.send('Form Fail');
    });
});
