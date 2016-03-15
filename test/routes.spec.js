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

before(() => {
  const URI = 'mongodb://localhost/testKoa2blog';
  mongoose.connect(URI);
});

after(() => {
  mongoose.connection.db.dropDatabase();
});


describe('api endpoint', () => {
  describe('/user', () => {
    const prefix = '/user';
    const user = { mail: 'batman@wayne.com', role: 'user', password: 'Martha' };

    describe('#post', () => {
      let userID = '';
      after(done => {
        // Clean up after each test
        User.remove({}).then(() => done());
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

      it('expect get a user object without password', done => {
        expect(User.findById(userID).exec()).to.eventually.containSubset({
          mail: user.mail,
          role: user.role,
        }).and.not.have.key('password').notify(done);
      });
    });

    describe('#get', () => {
      after(done => {
        // Clean up after each test
        User.remove({}).then(() => done());
      });
      before(done => {
        User.create(user).then(() => done());
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
      after(done => {
        // Clean up after each test
        User.remove({}).then(() => done());
      });
      before(done => {
        User.create(user).then(data => {
          expect(data).to.be.an('object');
          expect(data._id).to.exist;
          userID = data._id;
          done();
        });
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
      after(done => {
        // Clean up after each test
        User.remove({}).then(() => done());
      });
      before(done => {
        User.create(user).then(data => {
          expect(data).to.be.an('object');
          userID = data._id;
          done();
        });
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

      it('expect user was changed', done => {
        expect(User.findById(userID).exec()).eventually.containSubset(newUser).notify(done);
      });
    });
    describe('#delete', () => {
      let userID = '';
      after(done => {
        User.remove({}).then(() => done());
      });
      before(done => {
        User.create(user).then(data => {
          expect(data).to.be.an('object');
          userID = data._id;
          done();
        });
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
      it('expect user was deleted', done => {
        expect(User.findById(userID).exec()).to.be.eventually.not.exist.notify(done);
      });
    });
  });
});
