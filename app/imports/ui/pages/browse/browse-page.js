import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Clubs } from '/imports/api/club/ClubCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Majors } from '/imports/api/major/MajorCollection';

const selectedInterestsKey = 'selectedInterests';
const selectedMajorsKey = 'selectedMajors';

Template.Browse_Page.onCreated(function onCreated() {
  this.subscribe(Interests.getPublicationName());
  this.subscribe(Clubs.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.subscribe(Majors.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(selectedInterestsKey, undefined);
  this.messageFlags.set(selectedMajorsKey, undefined);
});

Template.Browse_Page_Directory.onRendered(function onRendered() {
  this.$('.special.cards .image').dimmer({
    on: 'hover'
  });
});
Template.Browse_Page.helpers({
  profiles() {
    // Initialize selectedInterests to all of them if messageFlags is undefined.
    if (!Template.instance().messageFlags.get(selectedInterestsKey)) {
      Template.instance().messageFlags.set(selectedInterestsKey, _.map(Interests.findAll(), interest => interest.name));
    }
    // Find all profiles with the currently selected interests.
    const allProfiles = Profiles.findAll();
    const selectedInterests = Template.instance().messageFlags.get(selectedInterestsKey);
    return _.filter(allProfiles, profile => _.intersection(profile.interests, selectedInterests).length > 0);
  },
  clubs() {
    // Initialize selectedInterests to all of them if messageFlags is undefined.
    if (!Template.instance().messageFlags.get(selectedInterestsKey)) {
      Template.instance().messageFlags.set(selectedInterestsKey, _.map(Interests.findAll(), interest => interest.name));
      Template.instance().messageFlags.set(selectedMajorsKey, _.map(Majors.findAll(), major => major.name));
    }
    if (!Template.instance().messageFlags.get(selectedMajorsKey)) {
      Template.instance().messageFlags.set(selectedMajorsKey, _.map(Majors.findAll(), major => major.name));
    }
    // Find all profiles with the currently selected interests.
    const allClubs = Clubs.findAll();
    const selectedInterests = Template.instance().messageFlags.get(selectedInterestsKey);
    const selectedMajors = Template.instance().messageFlags.get(selectedMajorsKey);
    return _.filter(allClubs, club => {
      return (_.intersection(club.interests, selectedInterests).length > 0)
          && (_.intersection(club.majors, selectedMajors).length > 0);
    });
  },

  interests() {
    return _.map(Interests.findAll(),
        function makeInterestObject(interest) {
          return {
            label: interest.name,
            selected: _.contains(Template.instance().messageFlags.get(selectedInterestsKey), interest.name),
          };
        });
  },
  majors() {
    return _.map(Majors.findAll(),
        function makeMajorObject(major) {
          return {
            label: major.name,
            selected: _.contains(Template.instance().messageFlags.get(selectedMajorsKey), major.name),
          };
        });
  }
});

Template.Browse_Page.events({
  'submit .filter-data-form'(event, instance) {
    event.preventDefault();
    const selectedOptions = _.filter(event.target.Interests.selectedOptions, (option) => option.selected);
    const selectedOptions2 = _.filter(event.target.Majors.selectedOptions, (option) => option.selected);

    instance.messageFlags.set(selectedInterestsKey, _.map(selectedOptions, (option) => option.value));
    instance.messageFlags.set(selectedMajorsKey, _.map(selectedOptions2, (option) => option.value));
  },
});

