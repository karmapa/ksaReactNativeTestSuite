import ksa from 'ksana-simple-api';

export default function filter(options) {

  return new Promise((resolve, reject) => {

    options = Object.assign({db: 'jiangkangyur'}, options);

    ksa.filter(options, (err, rows) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(rows);
      }
    });
  });
}
