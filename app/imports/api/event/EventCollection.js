import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Tracker } from 'meteor/tracker';


/** @module Event */

/**
 * Represents a specific event, such as "ICS TownHall".
 * @extends module:Base~BaseCollection
 */

class EventCollection extends BaseCollection {

  /**
   * Creates the Interest collection.
   */
  constructor() {
    super('Event', new SimpleSchema({
      name: { type: String },
      description: { type: String, optional: true }, // @What
      date: { type: Date }, // @When
      time: [{
        start: { type: String },
        end: { type: String, optional: true },
      }],
      location: { type: String }, // @Where
    }, { tracker: Tracker }));
  }

  /**
   * Defines a new Event.
   * @example
   * Event.define({ name: 'ICS TownHall',
   *                    description: 'Come out and have an open dialogue amongst other students and faculty in the
   *                    ICS department about concerns and other issues you may have. This is a great opportunity where
   *                    students and faculty can give their inputs on topic related...',
    *                   date: 12-05-2017,
    *                   time: [{
    *                     start: 10:30am,
    *                     end:  3:00pm}],
    *                   location: ICSpace @P318
    *                   });
   * @param { Object } description Object with keys name, description, date, time, and location of the event.
   * Name is required. Description is optional. Date must be in Date format. The start time is required,
   * but end time can be optional. Location is required.
   * @returns The newly created docID.
   */
  define({ name, description, date, time, location }) {
    check(name, String);
    check(description, String);
    check(date, Date);
    check(time, [{ start: String, end: String }]);
    check(location, String);
    return this._collection.insert({ name, description, date, time, location });
  }
  /**
   * Returns the Event name corresponding to the passed interest docID.
   * @param eventID An interest docID.
   * @returns { String } An event name.
   * @throws { Meteor.Error} If the event docID cannot be found.
   */
  findName(eventID) {
    this.assertDefined(eventID);
    return this.findDoc(eventID).name;
  }

  /**
   * Returns a list of Event names corresponding to the passed list of Event docIDs.
   * @param eventIDs A list of Event docIDs.
   * @returns { Array }
   * @throws { Meteor.Error} If any of the instanceIDs cannot be found.
   */
  findNames(eventIDs) {
    return eventIDs.map(eventID => this.findName(eventID));
  }

  /**
   * Throws an error if the passed name is not a defined Interest name.
   * @param name The name of an interest.
   */
  /*
  assertName(name) {
    this.findDoc(name);
  }
  */
  /**
   * Throws an error if the passed list of names are not all Interest names.
   * @param names An array of (hopefully) Interest names.
   */
  /*
  assertNames(names) {
    _.each(names, name => this.assertName(name));
  }
  */
  /**
   * Returns the docID associated with the passed event name, or throws an error if it cannot be found.
   * @param { String } name An interest name.
   * @returns { String } The docID associated with the name.
   * @throws { Meteor.Error } If name is not associated with an Interest.
   */
  findID(name) {
    return (this.findDoc(name)._id);
  }

  /**
   * Returns the docIDs associated with the array of event names, or throws an error if any name cannot be found.
   * If nothing is passed, then an empty array is returned.
   * @param { String[] } names An array of interest names.
   * @returns { String[] } The docIDs associated with the names.
   * @throws { Meteor.Error } If any instance is not an Interest name.
   */
  findIDs(names) {
    return (names) ? names.map((instance) => this.findID(instance)) : [];
  }

  /**
   * Returns an object representing the Event docID in a format acceptable to define().
   * @param docID The docID of an Interest.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const name = doc.name;
    const description = doc.description;
    return { name, description };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Events = new EventCollection();

