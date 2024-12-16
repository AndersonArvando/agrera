'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.createTable('user', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    name: { type: 'string', notNull: false },
    email: { type: 'string', notNull: false },
    password: { type: 'text', notNull: false },
    date_of_birth: { type: 'datetime', notNull: false },
    city: { type: 'string', notNull: false },
    contact_no: { type: 'string', notNull: false },
    role_id: { type: 'integer', notNull: false },
  }, callback);
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  "version": 1
};
