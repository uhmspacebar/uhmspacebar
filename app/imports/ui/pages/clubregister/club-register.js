import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Clubs } from '/imports/api/club/ClubCollection';
import { Majors } from '/imports/api/major/MajorCollection';
import { Interests } from '/imports/api/interest/InterestCollection';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

Template.Register_Club_Page.onCreated(function onCreated() {
  this.subscribe(Majors.getPublicationName());
  this.subscribe(Interests.getPublicationName());
  this.subscribe(Clubs.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = Clubs.getSchema().namedContext('Register_Club_Page');
});

Template.Register_Club_Page.helpers({
  successClass() {
    return Template.instance().messageFlags.get(displaySuccessMessage) ? 'success' : '';
  },
  displaySuccessMessage() {
    return Template.instance().messageFlags.get(displaySuccessMessage);
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  club() {
    return Clubs.findDoc(FlowRouter.getParam('username'));
  },
  majors() {
    const profile = Clubs.findDoc(FlowRouter.getParam('username'));
    const selectedMajor = profile.majors;
    return profile && _.map(Majors.findAll(),
            function makeMajorObject(major) {
              return { label: major.name, selected: _.contains(selectedMajor, major.name) };
            });
  },
  interests() {
    const profile = Clubs.findDoc(FlowRouter.getParam('username'));
    const selectedInterests = profile.interests;
    return profile && _.map(Interests.findAll(),
            function makeInterestObject(interest) {
              return { label: interest.name, selected: _.contains(selectedInterests, interest.name) };
            });
  },
});

Template.Register_Club_Page.events({
  'submit .club-data-form'(event, instance) {
    event.preventDefault();
    const clubName = event.target.Name.value;
    const username = FlowRouter.getParam('username'); // schema requires username.
    const caption = event.target.Caption.value;
    const abbrev = event.target.Abbreviation.value;
    const picture = event.target.Picture.value;
    const github = event.target.Github.value;
    const facebook = event.target.Facebook.value;
    const instagram = event.target.Instagram.value;
    const about = event.target.Bio.value;
    const selectedInterests = _.filter(event.target.Interests.selectedOptions, (option) => option.selected);
    const interests = _.map(selectedInterests, (option) => option.value);

    const selectedMajors = _.filter(event.target.Majors.selectedOptions, (option) => option.selected);
    const majors = _.map(selectedMajors, (option) => option.value);

    const updatedClubProfileData = {
      clubName, caption, about, abbrev, majors, picture, github, facebook, instagram, interests,
      username
    };

    // Clear out any old validation errors.
    instance.context.reset();
    // Invoke clean so that updatedProfileData reflects what will be inserted.
    const cleanData = Clubs.getSchema().clean(updatedClubProfileData);
    // Determine validity.
    instance.context.validate(cleanData);
    if (instance.context.isValid()) {
      const docID = Clubs.findDoc(FlowRouter.getParam('username'))._id;
      const id = Clubs.update(docID, { $set: cleanData });
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

