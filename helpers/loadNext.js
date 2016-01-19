import ksa from 'ksana-simple-api';

export default function loadNext(options) {

  return new Promise((resolve, reject) => {

    options = Object.assign({db: 'jiangkangyur'}, options);

    ksa.next(options, (err, rows) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(rows);
      }
    });
  });
}
