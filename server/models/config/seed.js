import ngfaker from 'ng-faker';
import shortid from 'shortid';
import db from '.';
import moment from 'moment';

const id = shortid.generate();

const seed = async () => {
  const userquery = `INSERT INTO
    users(id, email, firstname, lastname, password, is_admin, createdOn)
    VALUES($<id>, $<email>, $<firstname>, $<lastname>, $<password>, $<is_admin>, $<createdOn>)`;

  const user = {
    id,
    email: ngfaker.name.email(),
    firstname: ngfaker.name.email(),
    lastname: ngfaker.name.email(),
    password: ngfaker.name.email(),
    createdOn: moment().format('MMMM Do YYYY, h:mm:ss a'),
  };

  try {
    await db.none(userquery, user);
    // await db.none()
    // await db.none()
  } catch (error) {
    console.log(error.message);
  }
};

for (let i = 0; i < 3; i = +1) {
  seed();
}

// console.log(ngfaker.name.firstName())
