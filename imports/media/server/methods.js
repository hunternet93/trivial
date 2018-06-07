import { Meteor } from 'meteor/meteor';

import { is_editor } from '/imports/lib/accounts/role_helpers.js';
import { Media, MediaFiles } from '../collections.js';

Meteor.methods({
    'media.title'(_id, title) {
        is_editor(this);
        Media.update(_id, {$set: {title: title}});
    },
    
    'media.delete'(_id) {
        is_editor(this);
        
        let media = Media.findOne(_id);
        if (media) {
            MediaFiles.remove({_id: {$in: [media.source, media.poster, media.thumb]}});
            Media.remove(media._id);
        }
    }
});
