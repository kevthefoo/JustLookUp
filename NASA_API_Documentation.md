# NASA API Documentation

## Table of Contents

-   [Authentication & Rate Limits](#authentication--rate-limits)
-   [APOD - Astronomy Picture of the Day](#apod---astronomy-picture-of-the-day)
-   [Asteroids NeoWs - Near Earth Object Web Service](#asteroids-neows---near-earth-object-web-service)
-   [DONKI - Space Weather Database](#donki---space-weather-database)
-   [EONET - Earth Observatory Natural Event Tracker](#eonet---earth-observatory-natural-event-tracker)
-   [EPIC - Earth Polychromatic Imaging Camera](#epic---earth-polychromatic-imaging-camera)
-   [Exoplanet Archive](#exoplanet-archive)
-   [GIBS - Global Imagery Browse Services](#gibs---global-imagery-browse-services)
-   [InSight - Mars Weather Service](#insight---mars-weather-service)
-   [NASA Image and Video Library](#nasa-image-and-video-library)
-   [Open Science Data Repository](#open-science-data-repository)
-   [Satellite Situation Center](#satellite-situation-center)
-   [SSD/CNEOS - Solar System Dynamics](#ssdcneos---solar-system-dynamics)
-   [TechPort](#techport)
-   [TechTransfer](#techtransfer)
-   [TLE API](#tle-api)
-   [Trek WMTS](#trek-wmts)

---

## Authentication & Rate Limits

### Authentication

You do not need to authenticate in order to explore the NASA data. However, if you will be intensively using the APIs to, say, support a mobile application, then you should sign up for a NASA developer key.

### Web Service Rate Limits

Limits are placed on the number of API requests you may make using your API key. Rate limits may vary by service, but the defaults are:

-   **Hourly Limit:** 1,000 requests per hour

For each API key, these limits are applied across all api.nasa.gov API requests. Exceeding these limits will lead to your API key being temporarily blocked from making further requests. The block will automatically be lifted by waiting an hour. If you need higher rate limits, contact us.

### DEMO_KEY Rate Limits

In documentation examples, the special DEMO_KEY api key is used. This API key can be used for initially exploring APIs prior to signing up, but it has much lower rate limits, so you're encouraged to signup for your own API key if you plan to use the API (signup is quick and easy). The rate limits for the DEMO_KEY are:

-   **Hourly Limit:** 30 requests per IP address per hour
-   **Daily Limit:** 50 requests per IP address per day

### How Do I See My Current Usage?

Your can check your current rate limit and usage details by inspecting the `X-RateLimit-Limit` and `X-RateLimit-Remaining` HTTP headers that are returned on every API response. For example, if an API has the default hourly limit of 1,000 request, after making 2 requests, you will receive this HTTP header in the response of the second request:

```
X-RateLimit-Remaining: 998
```

The hourly counters for your API key reset on a rolling basis.

**Example:** If you made 500 requests at 10:15AM and 500 requests at 10:25AM, your API key would become temporarily blocked. This temporary block of your API key would cease at 11:15AM, at which point you could make 500 requests. At 11:25AM, you could then make another 500 requests.

Anyone can register for an api.nasa.gov key, which can be used to access data across federal agencies.

---

## APOD - Astronomy Picture of the Day

⚠️ **Service Outage Notice:** This API is currently experiencing an unscheduled outage. We are working to resolve the issue as quickly as possible. We apologize for any inconvenience.

One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video. This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds; but generally help with discoverability of relevant imagery.

The full documentation for this API can be found in the [APOD API Github repository](https://github.com/nasa/apod-api).

### HTTP Request

```
GET https://api.nasa.gov/planetary/apod
```

**Note:** `concept_tags` are now disabled in this service. Also, an optional return parameter `copyright` is returned if the image is not public domain.

### Query Parameters

| Parameter    | Type       | Default  | Description                                                                                                                   |
| ------------ | ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `date`       | YYYY-MM-DD | today    | The date of the APOD image to retrieve                                                                                        |
| `start_date` | YYYY-MM-DD | none     | The start of a date range, when requesting date for a range of dates. Cannot be used with date.                               |
| `end_date`   | YYYY-MM-DD | today    | The end of the date range, when used with start_date.                                                                         |
| `count`      | int        | none     | If this is specified then count randomly chosen images will be returned. Cannot be used with date or start_date and end_date. |
| `thumbs`     | bool       | False    | Return the URL of video thumbnail. If an APOD is not a video, this parameter is ignored.                                      |
| `api_key`    | string     | DEMO_KEY | api.nasa.gov key for expanded usage                                                                                           |

### Example Query

```
https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY
```

---

## Asteroids NeoWs - Near Earth Object Web Service

NeoWs (Near Earth Object Web Service) is a RESTful web service for near earth Asteroid information. With NeoWs a user can: search for Asteroids based on their closest approach date to Earth, lookup a specific Asteroid with its NASA JPL small body id, as well as browse the overall data-set.

**Data-set:** All the data is from the NASA JPL Asteroid team (http://neo.jpl.nasa.gov/).

This API is maintained by SpaceRocks Team: David Greenfield, Arezu Sarvestani, Jason English and Peter Baunach.

### Neo - Feed

Retrieve a list of Asteroids based on their closest approach date to Earth.

```
GET https://api.nasa.gov/neo/rest/v1/feed?start_date=START_DATE&end_date=END_DATE&api_key=API_KEY
```

#### Query Parameters

| Parameter    | Type       | Default                 | Description                         |
| ------------ | ---------- | ----------------------- | ----------------------------------- |
| `start_date` | YYYY-MM-DD | none                    | Starting date for asteroid search   |
| `end_date`   | YYYY-MM-DD | 7 days after start_date | Ending date for asteroid search     |
| `api_key`    | string     | DEMO_KEY                | api.nasa.gov key for expanded usage |

#### Example Query

```
https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY
```

### Neo - Lookup

Lookup a specific Asteroid based on its NASA JPL small body (SPK-ID) ID

```
GET https://api.nasa.gov/neo/rest/v1/neo/
```

#### Path Parameters

| Parameter     | Type   | Default  | Description                                           |
| ------------- | ------ | -------- | ----------------------------------------------------- |
| `asteroid_id` | int    | none     | Asteroid SPK-ID correlates to the NASA JPL small body |
| `api_key`     | string | DEMO_KEY | api.nasa.gov key for expanded usage                   |

#### Example Query

```
https://api.nasa.gov/neo/rest/v1/neo/3542519?api_key=DEMO_KEY
```

### Neo - Browse

Browse the overall Asteroid data-set

```
GET https://api.nasa.gov/neo/rest/v1/neo/browse/
```

#### Example Query

```
https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY
```

---

## DONKI - Space Weather Database

The Space Weather Database Of Notifications, Knowledge, Information (DONKI) is a comprehensive on-line tool for space weather forecasters, scientists, and the general space science community. DONKI chronicles the daily interpretations of space weather observations, analysis, models, forecasts, and notifications provided by the Space Weather Research Center (SWRC), comprehensive knowledge-base search functionality to support anomaly resolution and space science research, intelligent linkages, relationships, cause-and-effects between space weather activities and comprehensive webservice API access to information stored in DONKI.

### API Components

| API                                  | Example                                                                                                                                                    |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Coronal Mass Ejection (CME)          | `https://api.nasa.gov/DONKI/CME?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY`                                                                  |
| Coronal Mass Ejection (CME) Analysis | `https://api.nasa.gov/DONKI/CMEAnalysis?startDate=2016-09-01&endDate=2016-09-30&mostAccurateOnly=true&speed=500&halfAngle=30&catalog=ALL&api_key=DEMO_KEY` |
| Geomagnetic Storm (GST)              | `https://api.nasa.gov/DONKI/GST?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY`                                                                  |
| Interplanetary Shock (IPS)           | `https://api.nasa.gov/DONKI/IPS?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&location=LOCATION&catalog=CATALOG&api_key=DEMO_KEY`                                |
| Solar Flare (FLR)                    | `https://api.nasa.gov/DONKI/FLR?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY`                                                                  |
| Solar Energetic Particle (SEP)       | `https://api.nasa.gov/DONKI/SEP?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY`                                                                  |
| Magnetopause Crossing (MPC)          | `https://api.nasa.gov/DONKI/MPC?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY`                                                                  |
| Radiation Belt Enhancement (RBE)     | `https://api.nasa.gov/DONKI/RBE?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY`                                                                  |
| High Speed Stream (HSS)              | `https://api.nasa.gov/DONKI/HSS?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY`                                                                  |
| WSA+EnlilSimulation                  | `https://api.nasa.gov/DONKI/WSAEnlilSimulations?startDate=2016-01-06&endDate=2016-01-06&api_key=DEMO_KEY`                                                  |
| Notifications                        | `https://api.nasa.gov/DONKI/notifications?startDate=2014-05-01&endDate=2014-05-08&type=all&api_key=DEMO_KEY`                                               |

### Default Parameters

Most DONKI APIs use these default parameters:

-   **startDate:** default to 30 days prior to current UTC date
-   **endDate:** default to current UTC date

### Notifications API

Parameters:

-   `startDate` and `endDate` are in format 'yyyy-MM-dd' UT
-   `type` could be: all, FLR, SEP, CME, IPS, MPC, GST, RBE, report

**Note:** The request date range is limited to 30 days. If the request range is greater than 30 days, it would limit your request range to (endDate-30) to endDate.

---

## EONET - Earth Observatory Natural Event Tracker

More and more NASA imagery is being made available via web services (WMS, WMTS, etc.) and a significant percentage of it is being produced and published in near real time (NRT=within a few hours after acquisition). This ability means that NASA imagery can be used more routinely to examine current natural events as they happen.

The Earth Observatory Natural Event Tracker (EONET) is a prototype web service with the goal of:

-   providing a curated source of continuously updated natural event metadata
-   providing a service that links those natural events to thematically-related web service-enabled image sources (e.g., via WMS, WMTS, etc.)

Development of EONET began in 2015 and has been supported by NASA's Earth Observatory and Earth Science Data and Information System (ESDIS) Project.

---

## EPIC - Earth Polychromatic Imaging Camera

The EPIC API provides information on the daily imagery collected by DSCOVR's Earth Polychromatic Imaging Camera (EPIC) instrument. Uniquely positioned at the Earth-Sun Lagrange point, EPIC provides full disc imagery of the Earth and captures unique perspectives of certain astronomical events such as lunar transits using a 2048x2048 pixel CCD (Charge Coupled Device) detector coupled to a 30-cm aperture Cassegrain telescope.

### Retrievable Metadata

The following information is available for every image in the collection:

-   Image [name]
-   Date
-   Caption
-   centroid_coordinates
-   dscovr_j2000_position
-   lunar_j2000_position
-   sun_j2000_position
-   attitude_quaternions

### Querying by Date(s)

| Parameter            | Type       | Default                    | Description                                                          |
| -------------------- | ---------- | -------------------------- | -------------------------------------------------------------------- |
| `natural`            | string     | Most Recent Natural Color  | Metadata on the most recent date of natural color imagery            |
| `natural/date`       | YYYY-MM-DD | Most Recent Available      | Metadata for natural color imagery available for a given date        |
| `natural/all`        | string     | Dates for Natural Color    | A listing of all dates with available natural color imagery          |
| `natural/available`  | string     | Dates for Natural Color    | Alternate listing of all dates with available natural color imagery  |
| `enhanced`           | string     | Most Recent Enhanced Color | Metadata on the most recent date of enhanced color imagery           |
| `enhanced/date`      | YYYY-MM-DD | Most Recent Available      | Metadata for enhanced color imagery for a given date                 |
| `enhanced/all`       | string     | Dates for Enhanced Imagery | A listing of all dates with available enhanced color imagery         |
| `enhanced/available` | string     | Dates for Enhanced Imagery | Alternate listing of all dates with available enhanced color imagery |
| `api_key`            | string     | DEMO_KEY                   | API key from api.nasa.gov for expanded usage                         |

### Example Queries

```
https://api.nasa.gov/EPIC/api/natural/images?api_key=DEMO_KEY
https://api.nasa.gov/EPIC/api/natural/date/2019-05-30?api_key=DEMO_KEY
https://api.nasa.gov/EPIC/api/natural/all?api_key=DEMO_KEY
https://api.nasa.gov/EPIC/archive/natural/2019/05/30/png/epic_1b_20190530011359.png?api_key=DEMO_KEY
```

---

## Exoplanet Archive

### Introduction

The Exoplanet Archive API allows programatic access to NASA's Exoplanet Archive database. This API contains a ton of options so to get started please visit [this page](https://exoplanetarchive.ipac.caltech.edu/docs/program_interfaces.html) for introductory materials. To see what data is available in this API visit [here](https://exoplanetarchive.ipac.caltech.edu/docs/API_queries.html) and also be sure to check out best-practices and troubleshooting in case you get stuck. Happy planet hunting!

### Example Queries

| Example API                                                                              | URL                                                                                                                                                                              |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Confirmed planets in the Kepler field                                                    | `https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?&table=exoplanets&format=ipac&where=pl_kepflag=1`                                                       |
| Confirmed planets that transit their host stars                                          | `https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?&table=exoplanets&format=ipac&where=pl_tranflag=1`                                                      |
| All planetary candidates smaller than 2Re with equilibrium temperatures between 180-303K | `https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=cumulative&where=koi_prad<2 and koi_teq>180 and koi_teq<303 and koi_disposition like 'CANDIDATE'` |

---

## GIBS - Global Imagery Browse Services

NASA's Global Imagery Browse Services (GIBS) are designed to deliver global, full-resolution satellite imagery to users in a highly responsive manner, enabling visual discovery of scientific phenomena, supporting timely decision-making for natural hazards, educating the next generation of scientists, and making imagery of the planet more accessible to the media and public.

GIBS provides quick access to over 1,000 satellite imagery products, covering every part of the world. Most imagery is updated daily - available within a few hours after satellite observation, and some products span almost 30 years.

### Access Mechanisms

GIBS provides access through four mechanisms:

1. An Open Geospatial Consortium (OGC) Web Map Tile Service (WMTS) that supports key-value-pair and RESTful tiled requests
2. An OGC Web Map Service (WMS) that supports a key-value-pair non-tiled requests
3. A Tiled Web Map Service (TWMS), an unofficial extension to the OGC WMS
4. Script-level access through the Geospatial Data Abstraction Library (GDAL)

### Supported Projections

-   Geographic / Equirectangular (EPSG:4326)
-   Web Mercator (EPSG:3857)
-   Arctic Polar Stereographic (EPSG:3413)
-   Antarctic Polar Stereographic (EPSG:3031)

---

## InSight - Mars Weather Service

**⚠️ THIS SERVICE HAS SIGNIFICANT MISSING DATA DUE TO INSIGHT NEEDING TO MANAGE POWER USE**

NASA's InSight Mars lander takes continuous weather measurements (temperature, wind, pressure) on the surface of Mars at Elysium Planitia, a flat, smooth plain near Mars' equator. Please note that there are sometimes problems with the sensors on Mars that result in missing data!

This API provides per-Sol summary data for each of the last seven available Sols (Martian Days). As more data from a particular Sol are downlinked from the spacecraft (sometimes several days later), these values are recalculated, and consequently may change as more data are received on Earth.

### HTTP Request

```
GET https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0
```

### Query Parameters

| Parameter  | Type   | Default  | Description                                                                       |
| ---------- | ------ | -------- | --------------------------------------------------------------------------------- |
| `version`  | float  | 1.0      | The version of this API                                                           |
| `feedtype` | string | json     | The format of what is returned. Currently the default is JSON and only JSON works |
| `api_key`  | string | DEMO_KEY | api.data.gov key for expanded usage                                               |

### Example Query

```
https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0
```

The rate limit for this API is every hour no more than 2000 hits for each individual IP.

---

## NASA Image and Video Library

Use this API to access the NASA Image and Video Library site at images.nasa.gov. For the latest documentation, please go [here](https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf).

The images.nasa.gov API is organized around REST, has predictable/resource-oriented URLs and uses HTTP response codes to indicate API errors. This API uses built-in HTTP features such as HTTP authentication and HTTP verbs, which are understood by many off-the-shelf HTTP clients.

### Available Endpoints

```
GET https://images-api.nasa.gov
```

| Endpoint                  | Description                                  |
| ------------------------- | -------------------------------------------- |
| `GET /search?q={q}`       | Performing a search                          |
| `GET /asset/{nasa_id}`    | Retrieving a media asset's manifest          |
| `GET /metadata/{nasa_id}` | Retrieving a media asset's metadata location |
| `GET /captions/{nasa_id}` | Retrieving a video asset's captions location |

---

## Open Science Data Repository

NASA OSDR provides a RESTful Application Programming Interface (API) to its full-text search, data file retrieval, and metadata retrieval capabilities. The API provides a choice of standard web output formats, either JavaScript Object Notation (JSON) or Hyper Text Markup Language (HTML), of query results.

### Study Data File API

#### Syntax

```
https://osdr.nasa.gov/osdr/data/osd/files/{OSD_STUDY_IDs}/?page={CURRENT_PAGE_NUMBER}&size={RESULTS_PER_PAGE}?all_files={ALL_FILES}
```

#### Parameters

| Data Type               | Notes              | Values                                                                       | Required |
| ----------------------- | ------------------ | ---------------------------------------------------------------------------- | -------- |
| `{OSD_STUDY_IDs}`       | Integer or Decimal | Comma separated list with mixture of single OSD accession numbers and ranges | Yes      |
| `{CURRENT_PAGE_NUMBER}` | Integer            | Current page number in pagination                                            | No       |
| `{RESULTS_PER_PAGE}`    | Integer            | Number of results returned per page in pagination (Max 25)                   | No       |
| `{ALL_FILES}`           | Boolean            | Include hidden files. true to include invisible files; false to exclude      | No       |

### Example Requests

```
https://osdr.nasa.gov/osdr/data/osd/files/87
https://osdr.nasa.gov/osdr/data/osd/files/137,87-95,13,20-50
```

### Study Metadata API

#### Syntax

```
https://osdr.nasa.gov/osdr/data/osd/meta/{OSD_STUDY_ID}
```

### Study Dataset Search API

#### Syntax 1 (JSON response)

```
https://osdr.nasa.gov/osdr/data/search?<PARAMETER-LIST>
```

#### Syntax 2 (HTML response)

```
https://osdr.nasa.gov/bio/repo/search?q=<SEARCH-TERMS>&data_source=<DATA-SOURCE>
```

### API Requests with Python

For basic API requests, the `requests` python library can be used:

```bash
pip install requests
```

```python
import requests
response = requests.get("API_ENDPOINT_HERE").json()
# Example:
response = requests.get("https://osdr.nasa.gov/osdr/data/osd/files/87").json()
```

---

## Satellite Situation Center

The Satellite Situation Center Web (SSCWeb) service has been developed and is operated jointly by the NASA/GSFC Space Physics Data Facility (SPDF) and the National Space Science Data Center (NSSDC) to support a range of NASA science programs and to fulfill key international NASA responsibilities.

The software and associated database of SSCWeb together form a system to cast geocentric spacecraft location information into a framework of (empirical) geophysical regions and mappings of spacecraft locations along lines of the Earth's magnetic field.

---

## SSD/CNEOS - Solar System Dynamics

Welcome to JPL's SSD (Solar System Dynamics) and CNEOS (Center for Near-Earth Object Studies) API service. This service provides an interface to machine-readable data (JSON-format) related to SSD and CNEOS.

### API Components

| API                | Description                                                               |
| ------------------ | ------------------------------------------------------------------------- |
| **CAD**            | Asteroid and comet close approaches to the planets in the past and future |
| **Fireball**       | Fireball atmospheric impact data reported by US Government sensors        |
| **Mission Design** | Mission Design - Small-body mission design suite                          |
| **NHATS**          | Human-accessible NEOs data                                                |
| **Scout**          | NEOCP orbits, ephemerides, and impact risk data                           |
| **Sentry**         | NEO Earth impact risk assessment data                                     |

Each component has detailed documentation available at the JPL SSD/CNEOS API main website.

---

## TechPort

TechPort is NASA's technology inventory, showcasing the NASA portfolio of active and completed technology projects. TechPort makes available technology information from across the Agency in order to facilitate opportunities for collaboration and partnerships, analyses of how the Agency is meeting mission needs, and data visualizations of technology drivers that enable key decisions.

The NASA TechPort system provides a RESTful web services API to make technology project data available to other systems and services. This API can be used to export TechPort data into JSON format, which can be further processed and analyzed.

---

## TechTransfer

NASA's Technology Transfer Program ensures that innovations developed for exploration and discovery are broadly available to the public. This endpoint provides structured, searchable developer access to NASA's patents, software, and technology spinoff descriptions that have been curated to support technology transfer.

### HTTP Request

```
GET https://api.nasa.gov/techtransfer
```

### Query Parameters

| Parameter       | Type   | Default | Description                                                                                                |
| --------------- | ------ | ------- | ---------------------------------------------------------------------------------------------------------- |
| `patent`        | string | None    | Return a JSON of patents that match the string provided                                                    |
| `patent_issued` | string | None    | Returns patent results in a JSON that match the string within the information about how issued each patent |
| `software`      | string | None    | Returns JSON of NASA software that matches given string                                                    |
| `Spinoff`       | string | None    | Returns spinoff examples that match given word                                                             |

### Example Query

```
https://api.nasa.gov/techtransfer/patent/?engine&api_key=DEMO_KEY
```

---

## TLE API

The TLE API provides up to date two line element set records, the data is updated daily from CelesTrak and served in JSON format. A two-line element set (TLE) is a data format encoding a list of orbital elements of an Earth-orbiting object for a given point in time.

### Available Endpoints

```
GET http://tle.ivanstanojevic.me
```

| Endpoint                  | Description                                                    |
| ------------------------- | -------------------------------------------------------------- |
| `GET /api/tle?search={q}` | Performing a search by satellite name                          |
| `GET /api/tle/{q}`        | Retrieving a single TLE record where query is satellite number |

### Example Query

```
http://tle.ivanstanojevic.me/api/tle
```

---

## Trek WMTS

Here we have the collection of APIs that power the awesome Mars Trek and Vesta Trek NASA web-based portals for exploration and have newly added Moon Trek. These APIs can be leveraged using your favorite OGC RESTFul Web Map and Tile Service (WMTS) client.

### Basic URL Template

```
http://{WMTS endpoint}/1.0.0/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png
```

### Available Services

-   **Moon Trek:** Complete listing available at [https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=moon](https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=moon)
-   **Mars Trek:** Various mosaics including Viking Color Mosaic, CTX Mosaic, HiRISE Mosaics, HRSC Mosaics, and more
-   **Vesta Trek:** Global LAMO, DTM, Geology, Color Shade, and other specialized mosaics

Each service provides WMTS Capabilities XML for detailed configuration and usage information.

---

_This documentation covers the comprehensive NASA API ecosystem. For the most up-to-date information and detailed examples, please visit the individual API documentation links provided throughout this document._
