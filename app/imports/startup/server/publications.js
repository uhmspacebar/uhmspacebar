import { Interests } from '/imports/api/interest/InterestCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Majors } from '/imports/api/major/MajorCollection';
import { Clubs } from '/imports/api/club/ClubCollection';


Interests.publish();
Profiles.publish();
Majors.publish();
Clubs.publish();
