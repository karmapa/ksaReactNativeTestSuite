import ksa from 'ksana-simple-api';

export default function fetch(options) {

  return new Promise((resolve, reject) => {

    options = Object.assign({db: 'jiangkangyur'}, options);

    ksa.fetch(options, (err, rows) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(rows);
      }
    });
  });
}
