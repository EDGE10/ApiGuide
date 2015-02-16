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

## GET-ing Query Results
The best way to get data out of EDGE10 is to use a query.

### Configuring a Query
Queries are set up in the Query Builder in EDGE10 Online and define the data you want to retrieve.  These can include any one of the following 3 query types:

  1. **Session Lists**

     A list of sessions for one or more entities along with associated data

  2. **Summaries**

     Aggregated data over a period of time (e.g. average goals/game, maximum weight, etc.)

  3. **Data Item Lists**
     
     The values for a single data item over time for one or more entities

### Query Parameters
Once a query has been configured and saved you can get the results through the API by specifying:

 *  the query name
 *  the entity or entities for whom to run the query
 *  the date range over which to run the query

### Running the Query
Queries are invoked by making a `GET` request to the API with the parameters specified in the query string

```javascript
request({
    method: 'GET',
    url: config.siteUrl + '/api/query?entityType=AllSubjects&dateRangeType=CalendarYear&queryName=' + queryName,
     headers: {
        'X-ApiKey': apiKey
    },
    json: true
});
```

### Query results

The query results are returned in the form of a table, with column, row and cell definitions

```javascript
var results = {
  "columns": [
    { "header": "A Number" },
    { "header": "A Lookup" }
  ],
  "rows": [
    {
      "cells": [
        {
        "value": 123
        },
        {
          "lookupValues": [
            {
              "id": "ead94c47-c5f9-4e9a-bed8-2502daf500b1",
              "value": "Green",
              "index": 2,
              "score": 2
            }
          ]
        }
      ]
    }
  ]
};
```

Cell values are stored in either the `value` property of the cell or in the `lookupValues` array for a lookup type (whether single- or multi-lookup).

If you have run a session list query for multiple subjects, the results are returned as an **array of tables** - one table per subject.

### Metadata
Depending on the type of the query, each element (the results table itself, each column, row and cell) will contain various items of metadata.  These include (but are not limited to):

 * The contact ID (subject or user) to which the data applies
 * The session ID from which the data has been acquired
 * The ID of the attribute definition for the data
 * The ID of the aggregation definition for the data
 * The type of the data (numeric, text, boolean, etc.)
 * Whether or not the data is the result of a calculation
 * The traffic-light value of the data
 * etc.

These properties are accessible through the `metadata` property on each item which contains string-value pairs.

## Accessing Sessions
The Sessions API will most likely be the one of which you make most use.  It allows you to retrieve full (or partial) session data and to make changes to the data, attachments, contacts.

### Retrieving a Session
Assuming you know the ID of a session - perhaps from query metadata - then getting the data for a session is a simple GET call with the ID supplied.

```javascript
request({
    method: 'GET',
    url: config.siteUrl + '/api/session/' + sessionId,
     headers: {
        'X-ApiKey': apiKey
    },
    json: true
});
```

The data format returned can be quite lengthy so give it a try or check the API documentation for an example.

### Creating a session
To create a new session you can make a POST call to the same `/api/session` URL with some seed information.

The minimum requirements for creating a new session are:

 * A name for the session
 * A start and end date
 * The ID of the session type
 * At least one contact (subject, user or group).  Note that this is not enforced, but creating a session with no contacts makes it very difficult to find later!

```javascript
request({
    method: 'POST',
    url: config.siteUrl + '/api/session/',
    body: {
        sessionDetails: {
            name: 'session name',
            start: '2015-01-01T09:00',
            end: '2015-01-01T10:30',
            sessionTypeId: '[session type ID]'
        },
        contacts: [
            { contactType: 'User', contactId: '[users id]`
        ]
    },
    headers: {
        'X-ApiKey': apiKey
    },
    json: true
});
```

The response to the `POST` request will contain additional populated data from the API.  If data items are configured for the template then they will be returned with default values.

