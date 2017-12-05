import { Events } from '/imports/api/event/EventCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('EventCollection', function testSuite() {
    const name = 'Hackathon';
    const description = 'A hackathon (also known as a hack day, hackfest or codefest) is a design ' +
        'sprint-like event in which computer programmers and others involved in software development.';
    const date = new Date();
    const time = { start: '10:00am', end: '3:00pm' };
    const location = 'ICSpace P318';
    const defineObject = { name, description, date, time, location };

    before(function setup() {
      removeAllEntities();
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
      let docID = Events.define(defineObject);
      expect(Events.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = Events.findDoc(docID);
      expect(doc.name).to.equal(name);
      expect(doc.description).to.equal(description);
      // Check that multiple definitions with the same name fail
      expect(function foo() { Events.define(defineObject); }).to.throw(Error);
      // Check that we can dump and restore a Interest.
      const dumpObject = Events.dumpOne(docID);
      Events.removeIt(docID);
      expect(Events.isDefined(docID)).to.be.false;
      docID = Events.restoreOne(dumpObject);
      expect(Events.isDefined(docID)).to.be.true;
      Events.removeIt(docID);
    });

    it('#findID, #findIDs', function test() {
      const docID = Events.define(defineObject);
      expect(Events.isDefined(docID)).to.be.true;
      const docID2 = Events.findID(name);
      expect(docID).to.equal(docID2);
      Events.findIDs([name, name]);
      Events.removeIt(docID);
    });
  });
}

