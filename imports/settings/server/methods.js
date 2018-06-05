import { Meteor } from 'meteor/meteor';
import { Settings } from '../collections.js';

import { is_admin } from '/imports/lib/accounts/role_helpers.js';

Meteor.methods({
    'settings.set_value'(setting_id, value) {
        is_admin(this);
        
        Settings.update(setting_id, {$set: {value: value}});
    },
    
    'settings.modify'(setting_id, modifier) {
        is_admin(this);
        
        Settings.update(setting_id, modifier);
    }
});
