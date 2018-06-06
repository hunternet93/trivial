import { Meteor } from 'meteor/meteor';

import { is_editor } from '/imports/lib/accounts/role_helpers.js';
import { Media } from '../collections.js';

Meteor.methods({
    'media.new'() {
        is_editor(this);
    },
    
    'media.title'(_id, title) {
        is_editor(this);
        Media.update(_id, {$set: {title: title}});
    }
});
