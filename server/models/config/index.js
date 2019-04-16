import pgpromise from 'pg-promise';

const pgp = pgpromise();

const db = pgp('postgres://rokdniju:jD8oZlWv1cvFsnLSBkyfMIUQOsoWW0IJ@isilo.db.elephantsql.com:5432/rokdniju');

export default db;
