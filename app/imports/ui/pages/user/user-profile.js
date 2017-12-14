import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';

//const displaySuccessMessage = 'displaySuccessMessage';
//const displayErrorMessages = 'displayErrorMessages';

Template.User_Profile.onCreated(function onCreated() {
  this.subscribe(Interests.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.messageFlags = new ReactiveDict();
});

Template.User_Profile.helpers({
  profile() {
    return Profiles.findDoc(FlowRouter.getParam('username'));
  },
  interests() {

  },
  routeUserName() {
    return FlowRouter.getParam('username');
  }
});
