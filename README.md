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

```shell
npm install
```

### Using the Samples
The samples all use site-specific configuration which can be found in `samples/sample-config.js`.  These should be updated to match your environment before running any of the sample files.

Once updated, you can run any sample using node, e.g.

```shell
node samples/api-key-authentication.js
```

## Authentication
The API supports 2 authentication mechanisms: Basic and API-key-based.

[Basic authentication](http://en.wikipedia.org/wiki/Basic_access_authentication) requires that a valid username and password is base64 encoded into the headers for each request.

ApiKey authentication requires an initial call to the API using Basic authentication to acquire a valid API key.  This key can then be included in all request headers without the need to store user credentials.

When an ApiKey has been acquired, all requests made using that key will be under the account of the user who made the original request for the key.

### Step 1: Request an API Key
Note: you should only need to request an API key once per application; **NOT** for every request.

To request a key you need to `POST` to `/api/auth` specifing a `name` parameter to describe the requested key.  You can also optionally specify a lifetime for the key.
For the sample we will only create a 1 minute API key to avoid polluting the environment with sample keys.

```javascript
request({
    method: 'POST',
    url: config.siteUrl + '/api/auth?name=ApiSamples&lifetime=00:01:00',
    auth: {
        user: username,
        pass: password
    },
    json:true
});
```

### Step 2: Use the API key

Once you have created an API key you can use it to authenticate for all future requests.

Set the value against the `X-ApiKey` header and your request will be treated as if it had come from the same user that requested the key.

See *GET-ing Entities* below for an example call.

## GET-ing Entities
Entities refer to Subjects (i.e. players), Users and Groups within the EDGE10 system.  Details of all 3 are accessible through the API though only Subjects can be created at this stage.

You can get a list of all entities visible to the authenticated user with the `/api/entity` call:

```javascript
request({
    method: 'GET',
    url: config.siteUrl + '/api/entity',
    headers: {
        'X-ApiKey': apiKey
    },
    json: true
});
```

This returns an array with details of every visible entity.

