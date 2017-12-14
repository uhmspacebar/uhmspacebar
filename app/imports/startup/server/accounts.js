import { Accounts } from 'meteor/accounts-base';
import { Profiles } from '/imports/api/profile/ProfileCollection';

/* eslint-disable no-console */

/* Create a profile and club document for this user if none exists already. */
Accounts.validateNewUser(function validate(user) {
  if (user) {
    const username = user.services.cas.id;
    const firstName = '';
    const lastName = 'Temp';
    if (!Profiles.isDefined(username)) {
      Profiles.define({ username, firstName, lastName });
    }
  }
  // All UH users are valid for BowFolios.
  return true;
});
