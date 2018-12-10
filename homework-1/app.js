import {
    Product,
    User,
} from './models';

import config from './config/config.json';

new Product();
new User();

console.log(config.name);
