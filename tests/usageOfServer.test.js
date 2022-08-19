const mongoose = require('mongoose');
const supertest = require('supertest');
const UsageOfServer = require('../models/usageOfServerModel');
const app = require('../app');
const fs = require('fs');

beforeEach((done) => {
  mongoose.connect(
    'mongodb://localhost:27017/JestDB',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  );
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

test('GET /api/v1/usageOfServer', async () => {
  const post = await UsageOfServer.create({
    SPH: 152,
    IsPdfSend: 1,
    UserId: '62f3575ab51f8a773cde8ed1',
  });

  console.log(supertest(app).get('/api/v1/usageOfServer'));

  await supertest(app)
    .get('/api/v1/usageOfServer')
    .expect(200)
    .then((response) => {
      //   console.log('JSON= ', JSON.parse(response.text).data.usageOfServerModel);
      // Check type and length
      expect(
        Array.isArray(JSON.parse(response.text).data.usageOfServerModel)
      ).toBeTruthy();
      //   expect(response.body.length).toEqual(1);

      // Check data
      //   expect(response.body[0]._id).toBe(post.id);
      console.log(
        'JSON= ',
        JSON.parse(response.text).data.usageOfServerModel[0].UserId
      );

      expect(
        JSON.parse(response.text).data.usageOfServerModel[0].UserId.toString()
      ).toBe(post.UserId.toString());

      expect(
        JSON.parse(response.text).data.usageOfServerModel[0].SPH.toString()
      ).toBe(post.SPH);
    });
});

test('POST /api/v1/usageOfServer', async () => {
  const data = {
    UserId: '62f3575ab51f8a773cde8ed1',
    SPH: '65',
    UOM: '18',
    UOC: '4.5',
  };

  await supertest(app)
    .post('/api/v1/usageOfServer')
    .send(data)
    .expect(201)
    .then(async (response) => {
      console.log(JSON.parse(response.text).data.usageOfServerModel);

      // fs.writeFile('foo.txt', 'Hey there!', function (err) {
      //   if (err) {
      //     return console.log(err);
      //   }
      //   console.log('The file was saved!');
      // });

      fs.writeFileSync('foo.txt', response.text);
      //Check the response
      //expect(response.body._id).toBeTruthy();

      expect(JSON.parse(response.text).data.usageOfServerModel.SPH).toBe(
        data.SPH
      );
      expect(JSON.parse(response.text).data.usageOfServerModel.UOM).toBe(
        data.UOM
      );
      expect(JSON.parse(response.text).data.usageOfServerModel.UOC).toBe(
        data.UOC
      );
    });
});
