import { Trivial } from '/imports/lib/connection';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';

import { Media, Playlists, MediaFiles } from '../collections.js';

import '/imports/lib/widgets/editable_text';
import './media_view.html';

Router.route('/media/:_id', {
    subscriptions() {
        return Trivial.subscribe('media.one', this.params._id);
    },
    
    action() {
        if (this.ready()) {
            this.render('media_view', {
                data: function () {
                    return Media.findOne(this.params._id);
                }
            });
        } else {
            this.render('loading');
        }
    },
    
    name: 'media_view'
});

Template.media_view.events({
    'edited #media-title'(event, template) {
        let title = event.detail;
        if (title.length > 0) Trivial.call('media.title', this._id, title);
    }
});
