import { Accounts } from './accounts.js';

import './accounts_config.js';

if (Meteor.isClient) {
    import './client';
    export { Accounts };
} else {
    import './server';
}
