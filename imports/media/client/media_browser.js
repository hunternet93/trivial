import { Trivial } from '/imports/lib/connection';
import { Template } from 'meteor/templating';

import { Media, Playlists, MediaFiles } from '../collections.js';
import './media_browser.html';

Router.route('/', function () {
    this.wait(Trivial.subscribe('playlists.list'));
    
    if (this.ready()) {
        this.render('media_browser', {
            data: function () {
                return Playlists.find({}, {sort: [['title', 'asc']]});
            }
        });
    } else {
        this.render('loading');
    }
}, {
    name: 'media_browser'
});

Template.media_browser.onCreated(function () {
    // TODO put subscription in autorun with session vars containing currently-viewed playlist and page
    Trivial.subscribe('media.view', '', [], 0, 100);
});

Template.media_browser.helpers({    
    media() {
        return Media.find({}, {sort: [['title'], ['asc']]});
    },

    thumbURL() {
        if (this.thumb) {
            let file = MediaFiles.findOne({_id: this.thumb});
            if (file) return file.link();
        }

        // TODO make a default thumb for each media type
        return '';
    }
});
