import { Template } from 'meteor/templating';
import { Clubs } from '/imports/api/club/ClubCollection';

Template.Directory_Page.onCreated(function onCreated() {
  this.subscribe(Clubs.getPublicationName());
});

Template.Directory_Page.helpers({

  /**
   * Returns a cursor to profiles, sorted by last name.
   */
  clubs() {
    return Clubs.find({}, { sort: { clubName: 1 } });
  },
});
