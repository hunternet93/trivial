import { Template } from 'meteor/templating';
import { Media, MediaFiles } from '../collections.js';

import './media_item.html';

Template.media_item.helpers({
    thumbURL() {
        if (this.thumb) {
            let file = MediaFiles.findOne({_id: this.thumb});
            if (file) return file.link();
        }

        // TODO make a default thumb for each media type
        return '';
    },
    
    linkData() {
        return {_id: this._id}
    }
});
