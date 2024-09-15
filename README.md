# NexSlot

NexSlot is an appointment booking app.

## How to Setup

### Backend

1. Go to the `server` directory.
2. Run `npm ci` to install the dependencies.
3. Start the server with `node server.js`.

### API Endpoints

#### Get Events

```bash
curl --location --request GET 'http://API_URL/api/events?startDate=2024-09-15&endDate=2024-09-16' \
--header 'Content-Type: application/json' 
```

#### Get Events
```bash
curl --location 'http://API_URL/api/slots' \
--header 'Content-Type: application/json' \
--data '{
  "dateTime": "2024-09-16T10:30:00Z",
  "duration": 40,
  "timezone":"UTC"
}'
```
### Get Slots 
```bash
curl --location --request GET 'http://API_URL/api/slots?date=2024-09-16&timezone=UTC' \
--header 'Content-Type: application/json' 
--data ''
```

