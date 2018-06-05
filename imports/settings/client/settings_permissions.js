import { Trivial } from '/imports/lib/connection';
import { Settings } from '/imports/settings/collections.js';
import { Template } from 'meteor/templating';

import './settings_permissions.html';

Template.settings_permissions.helpers({
    isChecked(setting) {
        if (Settings.findOne(setting).value)
            return 'checked';
        else return '';
    }
});

Template.settings_permissions.events({
    'change #require-signed-in'(event, template) {
        Meteor.call('settings.set_value', 'require_signed_in', event.target.checked);
    },
    
    'change #require-approval'(event, template) {
        Meteor.call('settings.set_value', 'require_approval', event.target.checked);
    }
});
