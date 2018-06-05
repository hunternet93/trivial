import { Meteor } from 'meteor/meteor';
import { Settings } from '/imports/settings/collections.js';

Accounts.onCreateUser(function (options, user) {
    // If this is the first user to be created, make it an admin
    if (Meteor.users.find().count() == 0) {
        user.roles = ['viewer', 'editor', 'admin'];
    } else {
        if (Settings.findOne({_id: 'require_approval'})) {
            user.roles = [];
        } else {
            user.roles = ['viewer'];
        }
    }
    
    // Defauting to light theme, even though dark theme is cooler.
    user.theme = 'light';
    
    // 'Cause the Meteor Guide says to. 
    if (options.profile) {
        user.profile = options.profile
    }
    
    return user;
});
