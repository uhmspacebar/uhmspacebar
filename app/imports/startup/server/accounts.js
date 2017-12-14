import { Accounts } from 'meteor/accounts-base';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Clubs } from '/imports/api/club/ClubCollection';

/* eslint-disable no-console */

/* Create a profile and club document for this user if none exists already. */
Accounts.validateNewUser(function validate(user) {
  if (user) {
    const username = user.services.cas.id;
    if (!Profiles.isDefined(username)) {
      Profiles.define({ username });
      Clubs.define({ username });
    }
  }
  // All UH users are valid for BowFolios.
  return true;
});
