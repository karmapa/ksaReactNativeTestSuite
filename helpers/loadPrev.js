import ksa from 'ksana-simple-api';

export default function loadPrev(options) {

  return new Promise((resolve, reject) => {

    options = Object.assign({db: 'jiangkangyur'}, options);

    ksa.prev(options, (err, rows) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(rows);
      }
    });
  });
}
