import User from '../models/user';
import { expect } from 'chai';

describe('User', () => {
  const user = { mail: 'swampthing@parlament.com', password: 'Abigail', role: 'user' };
  const { mail, password } = user;

  before(async () => {
    const u = await User.create(user);
    expect(u.password).to.be.not.eql(password);
  });

  describe('#comparePassword', () => {
    it('expect #comparePassword return true with correct password', async () => {
      const u = await User.findOne({ mail });
      const isMatch = await u.comparePassword(password);
      expect(isMatch).to.be.true;
    });

    it('expect #comparePassword return false with incorrect password', async () => {
      const passwordToFail = 'Arcane';
      const u = await User.findOne({ mail });
      const isMatch = await u.comparePassword(passwordToFail);
      expect(isMatch).to.be.false;
    });

    it('expect password field is hidden', async () => {
      const u = await User.findOne({ mail });
      expect(u.password).to.not.exist;
    });
  });
});
