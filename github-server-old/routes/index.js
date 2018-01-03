"use strict";

const files = require('../lib/files');
/**
 * Module Dependencies
 */
const axios = require('axios');
const fs = require('fs');
const parse = require('parse-link-header');

const GITHUB_ENDPOINT = 'https://api.github.com/users/rnkoaa/repos';

module.exports = function (server) {
  const resultsTotal = (parsedLinks) => {
    let total = 0;
    if (parsedLinks) {
      if (parsedLinks.last) {
        const lastLinks = parsedLinks.last;
        const lastPage = lastLinks.page;
        const perPage = lastLinks.per_page;
        total = parseInt(lastPage) * parseInt(perPage);
      } else if (parsedLinks.prev) {
        const lastLinks = parsedLinks.prev;
        const prevPage = lastLinks.page;
        const perPage = lastLinks.per_page;
        total = (parseInt(prevPage) + 1) * parseInt(perPage);
      }
    }
    return total;
  };

  const generateParams = (req) => {
    const reqParams = {};

    if (req.params.sort) {
      reqParams.sort = req.params.sort;
    }

    if (req.params.direction) {
      reqParams.direction = req.params.direction;
    }

    if (req.params.page && req.params.page > 0) {
      reqParams.page = req.params.page;
    } else {
      reqParams.page = 1;
    }

    if (req.params.size && req.params.size > 0) {
      reqParams.per_page = req.params.size;
    } else {
      reqParams.per_page = 10;
    }

    return reqParams;
  };

  server.get('/repos', async(req, res, next) => {
    try {
      const repos = files.readFile('assets/json/kbastani.github.full.json');
      console.log(repos);
      const reqParams = generateParams(req);

      res.json(repos);
    } catch (err) {
      res().json(err);
    }
  });

  server.get('/github-repos', async(req, res, next) => {
    console.log(JSON.stringify(req.params));
    const reqParams = {};

    if (req.params.sort) {
      reqParams.sort = req.params.sort;
    }

    if (req.params.direction) {
      reqParams.direction = req.params.direction;
    }

    if (req.params.page && req.params.page > 0) {
      reqParams.page = req.params.page;
    } else {
      reqParams.page = 1;
    }

    if (req.params.size && req.params.size > 0) {
      reqParams.per_page = req.params.size;
    } else {
      reqParams.per_page = 10;
    }

    // make an async request.
    const response = await axios.get(GITHUB_ENDPOINT, {
      params: reqParams
    });

    const linkHeader = response.headers.link;
    const parsedLinks = parse(linkHeader);

    const resp = {};
    resp.data = response.data;
    resp.page = parseInt(reqParams.page);
    if (parseInt(reqParams.page) > 1) {
      resp.prev = parseInt(reqParams.page) - 1
    }
    resp.direction = reqParams.direction;
    resp.sort = reqParams.sort;
    resp.size = parseInt(reqParams.per_page);
    resp.next = parseInt(reqParams.page) + 1;
    resp.total = resultsTotal(parsedLinks);

    res.json(resp);
    next();
  });
};