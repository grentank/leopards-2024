const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const token = jwt.sign({ foo: 'bar' }, 'shhhhh');

console.log(token);

// bcrypt.hash('123', 10)
//   .then(console.log);

// bcrypt.compare('1233', '$2b$10$nvYW8HW65uw1rqlmhp73iuyYtIQEjrxHa8XavIEKI7TF9Ijk1TERu')
//   .then(console.log);
