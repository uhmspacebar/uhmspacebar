import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Tracker } from 'meteor/tracker';

/** @module Club */

/**
 * Club provides general club information for a specific club.
 * @extends module:Base~BaseCollection
 */
class ClubCollection extends BaseCollection {

  /**
   * Creates the Club collection.
   */
  constructor() {
    super('Club', new SimpleSchema({
      name: { type: String },
      caption: { type: String },
      about: { type: String },
      ownerUsername: { type: String },
      // Remainder are optional
      abbreviation: {type: String, optional: true },
      picture: { type: SimpleSchema.RegEx.Url, optional: true },
      github: { type: SimpleSchema.RegEx.Url, optional: true },
      facebook: { type: SimpleSchema.RegEx.Url, optional: true },
      instagram: { type: SimpleSchema.RegEx.Url, optional: true },
    }, { tracker: Tracker }));
  }

  /**
   * Defines a new Club.
   * @example
   * Clubs.define({
   *    name: 'Grey Hats UHM',
   *    caption: 'Grey Hats from the University of Hawaii at Manoa',
   *    about: 'The Grey Hats is a student-led, extracurricular activity focuses on real-world training for cyber defense.',
   *    ownerUsername: 'lafwandu',
   *    abbreviation: 'GH-UHM',
   *    picture: 'http://something.io/hosting/b/greyhats/image00001.jpg',
   *    github: 'http://github.comuhmgreyhats/',
   *    facebook: 'facebook.com/greyhatsuhm',
   *    instagram: 'instagram.com/greyhatsuhm'
   * });
   *
   * @param { Object } description Object with required key username.
   * Remaining keys are optional.
   * @throws { Meteor.Error } If a club with the same name already exists, or if any
   * of the four required fields are not included.
   * @returns The newly created docID.
   */
  define({ name, caption, about, ownerUsername, abbreviation = '', picture = '', github = '', facebook = '', instagram = ''}) {
    // make sure required fields are OK.
    const checkPattern = {
      name: String,
      caption: String,
      about: String,
      ownerUsername: String,
      abbreviation: String,
      picture: String,
      github: String,
      facebook: String,
      instagram: String
    };
    check(
        { name, caption, about, ownerUsername, abbreviation,  picture, github, facebook, instagram },
        checkPattern
    );

    if (this.find({ name }).count() > 0) {
      throw new Meteor.Error(`${name} is previously defined as another Club`);
    }

    return this._collection.insert({ name, caption, about, ownerUsername, abbreviation, picture, github, facebook, instagram });
  }

  /**
   * Returns an object representing the Club docID in a format acceptable to define().
   * @param docID The docID of a Club.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const name = doc.name;
    const caption = doc.caption;
    const about = doc.about;
    const ownerUsername = doc.ownerUsername;
    const abbreviation = doc.abbreviation;
    const picture = doc.picture;
    const github = doc.github;
    const facebook = doc.facebook;
    const instagram = doc.instagram;
    return {
      name,
      caption,
      about,
      ownerUsername,
      abbreviation,
      picture,
      github,
      facebook,
      instagram
    };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Clubs = new ClubCollection();