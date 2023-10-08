# Dynamic Data Search Project

This project is built using Next.js and provides dynamic data searching capabilities, including query and filter options to refine the search results. It exposes two main APIs for fetching metadata and performing searches based on various parameters.

There is working deployment of the project hosted on Vercel, Every succeful PR updates the deploment.

https://finder-mocha.vercel.app/

## Table of Contents

- [Installation](#installation)
- [Usage](#Getting started)
- [API](#APIs)
  - [/api/meta](#apimeta)
  - [/api/search](#apisearch)

## APIs

### 1. /api/meta

Returns metadata of the searchable data.

**Response Format:**

```typescript
{
  [key: string]: Metadata
}

export interface Metadata {
  dataType: string;
  values: any[];
  min?: string | number;
  max?: string | number;
  trueCount?: number;
  falseCount?: number;
}
```

### 2. /api/search

Allows searching data based on various parameters.

**Response Format:**

Request Type:

```typescript
export interface SearchRequest {
  query: string;
  aggregate: string;
  stats: string;
  size?: number;
  offset?: number;
  filters: FormFields | {};
}
```

Response Type:

```typescript
export interface SearchResponse {
  hits: number;
  results: object[];
  aggregations: AggregationsOrStats;
  stats: AggregationsOrStats;
}

export interface AggregationsOrStats {
  [key: string]: Record<string, number> | MinMaxValues;
}

export interface MinMaxValues {
  min: number;
  max: number;
}
```

## Getting started

- Node.js: The JavaScript runtime used for building and running the Next.js app. Download and install it from nodejs.org. [here](https://nodejs.org/)

- Yarn or npm - Follow installation instructions [here](https://yarnpkg.com/) for Yarn or [here](https://www.npmjs.com/) for npm

### Steps

1. Clone the repo

```sh
git clone https://github.com/sharvaibhav/finder-local
```

###

2. Install dependencies

```sh
npm install
```

3. Start the dev server

```sh
npm run dev
```

4. Generate some data as per the need

```sh
npm run generate-data
```

### The application should now be running on http://localhost:3000.
