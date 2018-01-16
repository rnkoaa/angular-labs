const express = require('express');
const files = require('../libs/db');
const _ = require('lodash');

const router = express.Router();

const paginate = (array, page_size, page_number) => {
  --page_number; // because pages logically start with 1, but technically with 0
  return array.slice(page_number * page_size, (page_number + 1) * page_size);
};

/* GET all. */
router.get('/', function (req, res, next) {
  files.readFile('./assets/db.json')
    .then(fileContent => {
      res.set({
        'Content-Type': 'application/json',
      });
      res.status(200).send(fileContent);
    }).catch(err => {
      res.status(500).json(err);
    });
});

/* GET repos. */
router.get('/repos', function (req, res, next) {

  const page = req.query.page || 1;
  const per_page = req.query.size || 10;
  const direction = req.query.direction || 'asc';
  const sort = req.query.sort || 'name';

  // res.render('index', { title: 'Express' });
  files.readFile('./assets/db.json')
    .then(fileContent => {
      let json = JSON.parse(fileContent);
      json = _.orderBy(json, [sort], [direction]);

      res.set({
        'Content-Type': 'application/json',
      });

      const pagedItem = paginate(json, per_page, page);

      const resp = {};
      resp.data = pagedItem;
      resp.page = page;

      if (parseInt(page) > 1) {
        resp.prev = parseInt(req.query.page) - 1;
      }

      resp.direction = direction;
      resp.sort = sort;
      resp.size = per_page;
      resp.next = parseInt(page) + 1;
      resp.total = json.length;



      res.json(resp);

    }).catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
