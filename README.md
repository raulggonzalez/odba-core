# vdba-core

`VDBA` (Valencia Database API) is an asynchronous API for the JavaScript language
that programmers can use to access data such as databases.
The VDBA philosophy is similar to the `Node.js` API's.

Implementations:

  - `cassandra-vdba-driver` for C* in `Node.js` (in development).
  - `indexeddb-vdba-driver` for IndexedDB in the browser (in development).
  - `postgresql-vdba-driver` for PostgreSQL in `Node.js` (coming soon).
  - `redis-vdba-driver` for Redis in `Node.js` (coming soon).
  - `sqlite-vdba-driver` for SQLite in `Node.js` (in development).

The API documentation is available in `doc/api.html.zip`.

The guide is available in [here](https://github.com/raulggonzalez/vdba-doc).

Software used in this project:

  - Unit testing: `Mocha` and `Should.js`.
  - Automation: `Grunt`.
  - JavaScript: `JSDoc`, `JSHint` and `Uglify`.
  - Browsers: `Chrome` and `Firefox`.
  - `Node.js`.