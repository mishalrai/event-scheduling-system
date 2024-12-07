# Event-Scheduling-System API

An Event Scheduling System that enables users to create and manage events, addressing complexities such as time zone handling, conflict detection, and time-sensitive validations. The system ensures events are scheduled without overlaps and adhere to users' respective time zones.

# Used Technology

- Nodejs
- Express
- Postgres
- Sequelize

# Prerequisites Requirement

- Recommended Node version `v20.11.0`

# How to setup project and run the project

- Run `npm ci` command to install require packages
- Configure the postgres database configuration in `.env` file. according to the your local machine configuration Update Data `DB_NAME` and `DB_PASSWORD`.
- Run `npm start` command to start the server on port `3000`.
- `sequelize` auto creates the required tables ['events', 'participants'] with attributes according to the models.

# Available Features with API Detail

## Event

- ### Create an event

  - Payload validation check
  - Event end time most be greater than the start
  - Event conflict checks [partially or completely overlap]
  - Restrict to certain country to create limited events for certain interval.

  #### API Detail

  **URL:**
  `localhost:3000/api/events`

  **Method:**
  `POST`

  **Headers:**
  | Key | Value |
  |---------------|-------------------|
  | `Content-Type`| `application/json`|

  **Body:**

  ```json
  {
    "title": "Team Meeting",
    "description": "Weekly sync-up meeting",
    "startTime": "2024-12-02T10:00:00Z",
    "endTime": "2024-12-02T11:00:00Z",
    "timeZone": "UTC",
    "location": "Zoom"
  }
  ```

- ### List out all events

  #### API Detail

  **URL:**
  `localhost:3000/api/events`

  **Method:**
  `GET`

- ### Filter the events by userId

  - Checks the provided user id is exist in participant table or not

  #### API Detail

  **URL:**
  `localhost:3000/api/events/search?userId=1`

  **Method:**
  `GET`

- ### Update event

  - Checks the provided event's id is exist in system or not
  - it's allow to update only title, description, timeZone, startTime, endTime and location

  #### API Detail

  **URL:**
  `localhost:3000/api/events`

  **Method:**
  `PUT`

  **Headers:**
  | Key | Value |
  |---------------|-------------------|
  | `Content-Type`| `application/json`|

  **Body:**

  ```json
  {
    "title": "UTC time",
    "description": "Description 2"
  }
  ```

- ### Delete event

  #### API Detail

  **URL:**
  `localhost:3000/api/events/:id`

  **Method:**
  `DELETE`

## Participant

- ### Add participant in event

  - Checks the provided eventId id is exist in event table or not
  - Checks the provided participant's email is already being used or not
  - Validate the email if provided

  #### API Detail

  **URL:**
  `localhost:3000/api/participants`

  **Method:**
  `POST`

  **Headers:**
  | Key | Value |
  |---------------|-------------------|
  | `Content-Type`| `application/json`|

  **Body:**

  ```json
  {
    "eventId": "1",
    "name": "Quick catch up",
    "email": "sd",
    "rsvpStatus": "pending"
  }
  ```

- ### List out all participants

  #### API Detail

  **URL:**
  `localhost:3000/api/participants`

  **Method:**
  `GET`

- ### Update participant

  - Checks the provided participant's id is exist in system or not
  - it's allow to update only eventId, name, email and rsvpStatus attributes

  #### API Detail

  **URL:**
  `localhost:3000/api/participants`

  **Method:**
  `PUT`

  **Headers:**
  | Key | Value |
  |---------------|-------------------|
  | `Content-Type`| `application/json`|

  **Body:**

  ```json
  {
    "rsvp_status": "accepted"
  }
  ```

- ### Provides the participants detail by eventId

  - Checks query param have eventId or not

    #### API Detail

    **URL:**
    `localhost:3000/api/participants/search?eventId=23`

    **Method:**
    `GET`

- ### Delete participant

  #### API Detail

  **URL:**
  `localhost:3000/api/participants/:id`

  **Method:**
  `DELETE`
