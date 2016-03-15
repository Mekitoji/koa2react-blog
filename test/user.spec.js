import User from '../models/user';
import chai, { expect } from 'chai';
import chaiSubset from 'chai-subset';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiSubset);
chai.use(chaiAsPromised);

describe('User', () => {
  const user = { mail: 'swampthing@parlament.com', password: 'Abigail', role: 'user' };
  const { mail, password } = user;

  before(done => {
    User.create(user).then(() => done());
  });

  it('expect pre #save hash password', done => {
    expect(User.findOne({ mail }).exec())
      .to.eventually.not.containSubset({ password })
      .notify(done);
  });

  describe('#comparePassword', () => {
    it('expect #comparePassword return true with correct password', done => {
      User.findOne({ mail }).exec()
        .then(data => {
          expect(data.comparePassword(password)).to.eventually.be.true.notify(done);
        })
        .catch(err => console.error(err));
    });

    it('expect #comparePassword return false with incorrect password', done => {
      const passwordToFail = 'Arcane';
      User.findOne({ mail }).exec()
        .then(data => {
          expect(data.comparePassword(passwordToFail)).to.eventually.be.false.notify(done);
        });
    });
  });
});
