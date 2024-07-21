# API Route Documentation

Available routes in the API:

## 1. Get all brokers
   - URL: GET /brokers
   - Description: Returns all brokers registered in the system.
   - Request Example:
     GET http://yourserver/brokers
   - Response Example (status code: 200 OK):
     {
       "status": true,
       "message": "Brokers retrieved successfully",
       "brokers": [
         {
           "id": 1,
           "name": "João Silva",
           "creci": "12345-j",
           "cpf": "123.456.789-00"
         },
         {
           "id": 2,
           "name": "Maria Souza",
           "creci": "12345-j",
           "cpf": "987.654.321-00"
         }
       ]
     }

## 2. Get a broker by ID
   - URL: GET /brokers/{id}
   - Description: Returns the information of a broker with the specified ID.
   - Request Example:
     GET http://yourserver/brokers/1
   - Response Example (status code: 200 OK):
     {
       "id": 1,
       "name": "João Silva",
       "creci": "12345-j",
       "cpf": "123.456.789-00"
     }

## 3. Create a new broker
   - URL: POST /brokers
   - Description: Creates a new broker in the system.
   - Request Example:
     POST http://yourserver/brokers
   - Parameters to be sent in the request body (JSON):
     {
       "name": "Fernanda Oliveira",
       "cpf": "456.789.123-00",
       "creci": "12345-k"
     }
   - Response Example (status code: 200 OK):
     {
       "status": true,
       "message": "Broker created successfully",
       "broker": true
     }

## 4. Update a broker by ID
   - URL: PUT /brokers/{id}
   - Description: Updates the information of a broker with the specified ID.
   - Request Example:
     PUT http://yourserver/brokers/1
   - Parameters to be sent in the request body (JSON):
     {
       "name": "Fernanda Oliveira",
       "cpf": "456.789.123-00",
       "creci": "12345-k"
     }
   - Response Example (status code: 200 OK):
     {
       "status": true,
       "message": "Broker updated successfully",
       "broker": 1
     }

## 5. Delete a broker by ID
   - URL: DELETE /brokers/{id}
   - Description: Deletes a broker with the specified ID.
   - Request Example:
     DELETE http://yourserver/brokers/1
   - Response Example (status code: 200 OK):
     {
       "status": true,
       "message": "Broker deleted successfully",
       "description": "Broker with ID 1 was deleted"
     }
