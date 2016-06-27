import chai, { expect } from 'chai';
import request from 'supertest';
import app from '../server';
import mongoose from 'mongoose';
import chaiSubset from 'chai-subset';
import User from '../models/user';
import chaiAsPromised from 'chai-as-promised';

const agent = request.agent(app.listen());

chai.use(chaiSubset);
chai.use(chaiAsPromised);

before(async () => {
  const URI = 'mongodb://localhost/testKoa2blog';
  mongoose.Promise = global.Promise;
  await mongoose.connect(URI);
});

after(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});


describe('api endpoint', () => {
  describe('api/user', () => {
    const prefix = '/api/user';
    const user = { mail: 'batman@wayne.com', role: 'user', password: 'Martha' };

    describe('#post', () => {
      let userID = '';
      after(async () => {
        // Clean up after each test
        await User.remove({});
      });

      it('expect response with 200', done => {
        agent
          .post(prefix)
          .send(user)
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.body).to.be.an('object');
            expect(res.body.password).not.equal(user.password);
            userID = res.body._id;
            done();
          });
      });

      it('expect get a user object without password', async () => {
        const u = await User.findById(userID);
        expect(u).to.containSubset({
          mail: user.mail,
          role: user.role,
        }).and.not.have.key('password');
      });
    });

    describe('#get', () => {
      before(async () => {
        await User.remove({});
        await User.create(user);
      });

      it('expect length of response array equal 1', done => {
        agent
          .get(prefix)
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.body).to.be.an('array').with.length(1);
            done();
          });
      });
    });

    describe('#get:id', () => {
      let userID = '';

      before(async () => {
        await User.remove({});
        const u = await User.create(user);
        expect(u).to.be.an('object');
        expect(u._id).to.exist;
        userID = u._id;
      });

      it('expect get a 200 response', done => {
        agent
          .get(`${prefix}/${userID}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.body)
              .to.be.an('object')
              .containSubset({ mail: user.mail, role: user.role });
            done();
          });
      });
    });

    describe('#put', () => {
      let userID = '';
      const newUser = { mail: user.mail, role: 'root' };

      before(async () => {
        await User.remove({});
        const u = await User.create(user);
        expect(u).to.be.an('object');
        expect(u._id).to.exist;
        userID = u._id;
      });

      it('expect response 200', done => {
        agent
          .put(`${prefix}/${userID}`)
          .send(newUser)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(err => {
            expect(err).to.not.exist;
            done();
          });
      });

      it('expect user was changed', async () => {
        const u = await User.findById(userID);
        expect(u).to.containSubset(newUser);
      });
    });
    describe('#delete', () => {
      let userID = '';

      before(async () => {
        await User.remove({});
        const u = await User.create(user);
        expect(u).to.be.an('object');
        expect(u._id).to.exist;
        userID = u._id;
      });

      it('expect response with 200 ', done => {
        agent
          .delete(`${prefix}/${userID}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(err => {
            expect(err).to.not.exist;
            done();
          });
      });
      it('expect user was deleted', async () => {
        const u = await User.findById(userID);
        expect(u).to.be.not.exist;
      });
    });
  });
});
