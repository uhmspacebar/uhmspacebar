import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Tracker } from 'meteor/tracker';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Majors } from '/imports/api/major/MajorCollection';


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
      username: { type: String },
      // Remainder are optional
      clubName: { type: String, optional: true  },
      caption: { type: String, optional: true  },
      about: { type: String, optional: true  },
      abbreviation: {type: String, optional: true },
      majors: { type: Array, optional: true },
      'majors.$': { type: String },
      interests: { type: Array, optional: true },
      'interests.$': { type: String },
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
   *    clubName: 'Grey Hats UHM',
   *    caption: 'Grey Hats from the University of Hawaii at Manoa',
   *    about: 'The Grey Hats is a student-led, extracurricular activity focuses on real-world training for cyber defense.',
   *    ownerUsername: 'lafwandu',
   *    abbreviation: 'GH-UHM',
   *    major: 'ICS'
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
  define({ clubName = '', caption = '', about = '', abbreviation = '', picture = '', github = '', majors = [], interests = [], facebook = '', instagram = '', username}) {
    // make sure required fields are OK.
    const checkPattern = {
      clubName: String,
      caption: String,
      about: String,
      abbreviation: String,
      picture: String,
      github: String,
      facebook: String,
      instagram: String,
      username: String,
    };
    check(
        { clubName, caption, about, abbreviation,  picture, github, facebook, instagram, username},
        checkPattern
    );

    if (this.find({ clubName }).count() > 0) {
      throw new Meteor.Error(`${clubName} is previously defined as another Club`);
    }

    // Throw an error if any of the passed Interest names are not defined.
    Interests.assertNames(interests);

    // Throw an error if there are duplicates in the passed interest names.
    if (interests.length !== _.uniq(interests).length) {
      throw new Meteor.Error(`${interests} contains duplicates`);
    }

    return this._collection.insert({ clubName, caption, about, abbreviation, majors, interests, picture, github, facebook, instagram, username});
  }

  /**
   * Returns an object representing the Club docID in a format acceptable to define().
   * @param docID The docID of a Club.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const clubName = doc.clubName;
    const caption = doc.caption;
    const about = doc.about;
    const username = doc.username;
    const abbreviation = doc.abbreviation;
    const picture = doc.picture;
    const github = doc.github;
    const majors = doc.majors;
    const interests = doc.interests;
    const facebook = doc.facebook;
    const instagram = doc.instagram;
    return {
      clubName,
      caption,
      about,
      username,
      abbreviation,
      picture,
      majors,
      interests,
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
