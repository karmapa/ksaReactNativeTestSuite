import kde from 'ksana-database';

export default function openDb(dbName = 'jiangkangyur') {

  return new Promise((resolve, reject) => {

    kde.open(dbName, function(err, db) {
      if (db) {
        resolve(db);
      }
      else {
        reject(err);
      }
    });
  });
}
