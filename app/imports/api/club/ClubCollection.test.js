/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

import { Clubs } from '/imports/api/club/ClubCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

if (Meteor.isServer) {
  describe('ClubCollection', function testSuite() {
    const name = 'Grey Hats';
    const caption = 'We do things';
    const about = 'We very much so absolutely like to do things, sometimes with computers.';
    const ownerUsername = 'obama';
    const abbreviation = 'GH-UHM';
    const picture = 'http://philipmjohnson.org/headshot.jpg';
    const github = 'http://github.com/philipjohnson';
    const facebook = 'http://github.com/philipjohnson';
    const instagram = 'http://github.com/philipjohnson';
    const defineObject = {
      name,
      caption,
      about,
      ownerUsername,
      abbreviation,
      picture,
      github,
      facebook,
      instagram,
    };

    before(function setup() {
      removeAllEntities();
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
      let docID = Clubs.define(defineObject);
      expect(Clubs.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = Clubs.findDoc(docID);
      expect(doc.name).to.equal(name);
      expect(doc.caption).to.equal(caption);
      expect(doc.about).to.equal(about);
      expect(doc.ownerUsername).to.equal(ownerUsername);
      expect(doc.abbreviation).to.equal(abbreviation);
      expect(doc.picture).to.equal(picture);
      expect(doc.github).to.equal(github);
      expect(doc.facebook).to.equal(facebook);
      expect(doc.instagram).to.equal(instagram);
      // Check that multiple definitions with the same club name
      expect(function foo() { Clubs.define(defineObject); }).to.throw(Error);
      // Check that we can dump and restore a Club.
      const dumpObject = Clubs.dumpOne(docID);
      Clubs.removeIt(docID);
      expect(Clubs.isDefined(docID)).to.be.false;
      docID = Clubs.restoreOne(dumpObject);
      expect(Clubs.isDefined(docID)).to.be.true;
      Clubs.removeIt(docID);
    });
  });
}

