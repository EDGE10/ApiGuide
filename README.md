# EDGE10 API Guide

The EDGE10 API allows developers to query and manipulate data and configuration with an EDGE10 Online environment.

This guide serves as an introduction to a few key principles.  For full API documentation you can navigate to `http://[your site address]/api/help` (administrators only).

## Basics
All API methods are accessible over HTTP using your client library of choice.  This documentation includes JavaScript samples for a node-based implementation but the calls will work no matter what client language you are using.

All calls are made with a combination of a resource URL (e.g. `/api/session/[session id]`) and one of 4 HTTP verbs:

 * GET to retrieve or query data
 * POST to create new data
 * PUT to update existing data
 * DELETE to delete data

There are some exceptions to these rules, but these will serve as a baseline assumption.

### Libraries
The samples in this documentation will use node along with a polyfill for ES6-style promises.  All dependencies can be installed by running the following from the command line.

```sh
npm install
```

### Using the Samples
The samples all use site-specific configuration which can be found in `samples/sample-config.js`.  These should be updated to match your environment before running any of the sample files.

Once updated, you can run any sample using node, e.g.

```sh
node samples/api-key-authentication.js
```

### edge10-request
Many of the samples use a helper function `edge10-request` that creates a request with some default values and with authentication details taken from the sample file.

## Further Reading

 * [Managing Authentication](https://github.com/EDGE10/ApiGuide/wiki/Authentication)
 * [Working with Entities](https://github.com/EDGE10/ApiGuide/wiki/Entities)
 * [Querying Data](https://github.com/EDGE10/ApiGuide/wiki/Queries)
 * [Working with Sessions](https://github.com/EDGE10/ApiGuide/wiki/Sessions)

