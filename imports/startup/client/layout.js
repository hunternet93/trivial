import { Trivial } from '/imports/lib/connection';
import { Template } from 'meteor/templating';

import { Playlists } from '/imports/media/collections.js';

import './layout.html';

Template.layout.helpers({
    samplePlaylists() {
        let sample = [];
        
        for (let i = 1; i < 25; i++) {
            sample.push({title: `Test Playlist ${i}`});
        }
        
        return sample;
    }
});
