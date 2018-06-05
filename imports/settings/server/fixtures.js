import { Settings } from '../collections.js';

let fixtures = [
{
    _id: 'require_signed_in',
    value: false
},
{
    _id: 'require_approval',
    value: false
}
];

Meteor.startup(function () {
    fixtures.forEach((fixture) => {
        Settings.insert(fixture, () => {}); // Empty callback to ignore errors if fixture already in DB
    });
});
