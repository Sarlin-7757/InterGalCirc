# API Usage Instructions

## Introduction
For testing the APIs of this project, we will be using Postman. A Postman collection has been prepared, which contains separate folders for each of the routes, namely:

- **Cargo**
- **Trade**
- **Inventory**
- **UpdatesInCargoandTrades**

The base domain for all API routes is:

```
http://localhost:5000/api/route-name
```



# Steps to Create and Organize a Postman Collection

###  Note: Download PostMan or use VSCode Extension for PostMan

## 1. Create a New Collection

**Open Postman**: Launch the Postman application.

**Create a New Collection**:
- Click on the **Collections** tab on the left sidebar.
- Click the **New Collection** button.
- Enter a name for the collection (e.g., "Intergalactic Trade Network API").
- Optionally, add a description and configure any settings you need.
- Click **Create**.

## 2. Add Folders for Different Routes

Organize your collection by creating folders for each set of related routes:

**Create Folders**:
- Click on the newly created collection.
- Click on the **Add Folder** button.
- Create folders such as **Cargo**, **Trade**, **Inventory**, and **UpdatesInCargoandTrades** to match your route categories.
- Click **Save**.

**Add Requests to Folders**:
- Select a folder.
- Click the **Add Request** button.
- Enter the request details (HTTP method, URL, headers, body, etc.).
- Save the request to the appropriate folder.

## 3. Configure Requests

Set up requests for each route as needed:

**Configure Request Details**:
- **URL**: Use `http://localhost:5000/api/<route-name>` as the base domain.
- **Method**: Choose GET, POST, PUT, DELETE, etc., based on the route.
- **Headers**: Add any required headers (e.g., `Content-Type: application/json`).
- **Body**: For POST and PUT requests, provide the necessary payload in JSON format.

**Test Endpoints**:
- Select a request from a folder.
- Click **Send** to execute the request.
- Review the response and status code to verify that the API behaves as expected.

## Example Folder Structure

- **Cargo**
  - Get All Cargos
  - Get Cargo by ID
  - Update Cargo

- **Trade**
  - Initiate Trade
  - Get Trade Details

- **Inventory**
  - Get Inventory
  - Update Inventory

- **UpdatesInCargoandTrades**
  - Real-Time Updates


# How to Start Sending Requests

## 1. Fill the Inventory with Data

IMPORTANT* 
Before initiating a trade, ensure that your inventory is populated with data. This is necessary because trade transactions can only occur between stations that have the required items.

**Steps to Fill the Inventory**:

- Navigate to the **Inventory** folder in your Postman collection.
- Select the **Update Inventory** request.
- Enter the necessary details to add items to the inventory at different stations.
- Click **Send** to execute the request.

**Example Request**:

**Method** POST: http://localhost:5000/api/inventory/

```

 // Ist Planet 
 {
    "stationId": "EAGLE",
    "planet": "NERU",
    "items": ["researchEquip", "wheat"],
    "quantity": 5
}
// IInd Planet 
 {
    "stationId": "EAGLE2",
    "planet": "NEXON",
    "items": ["researchEquip", "wheat"],
    "quantity": 10
  }

```

## 2. Initiate a Trade

Trade transactions can only be made between stations that have the required items. Ensure that the inventory is correctly set up before making a trade request.

**Steps to Initiate a Trade**:

1. **Navigate to the Trade folder** in your Postman collection.
2. **Select the Initiate Trade request**.
3. **Enter the details for the trade**, including the source and destination stations, and the items being traded.
4. **Click Send** to execute the request.

**Example Request**

**Method** POST: http://localhost:5000/api/trades **
```
{
  "buyer": "EAGLE",
  "seller": "EAGLE2",
  "items": ["researchEquip", "wheat"],
  "status": "pending"
}

```

This request will automatically update the inventory and update fields, with these details. 

## 3. Check Real-Time Updates

### **NOTE**: Can be started earlier after hitting Inventory request,can get the real time updates from tarde and cargo. 

To monitor real-time updates regarding trades and cargo, follow these steps:

**Steps to Check Real-Time Updates**:

1. After entering data into the inventory and initiating a trade, navigate to the `UpdatesInCargoandTrades` folder in your Postman collection.
2. Select the `Real-Time Updates` request.
3. Click `Send` to start a Server-Sent Events (SSE) connection.

**IMPORTANT**: This connection will keep you updated with real-time information about any changes to trades or cargo.

**Example Request**:

- **Method**: GET
- **URL**: [http://localhost:5000/api/updates/real-time/](http://localhost:5000/api/updates/real-time/)

The SSE connection will continue to push updates to your client as changes occur in the system.


## 4. Get Cargo Details 

**Example Request**

**Method** PUT: http://localhost:5000/api/cargo/update/shipment-c4884840-4bbc-45fe-aad5-5709bd485426
Update Cargo status. 
```
{
   "status": "in_transit"
}

```

**Method**: GET : http://localhost:5000/api/cargo/shipment-c4884840-4bbc-45fe-aad5-5709bd485426
Get Cargo Detail By Id

### Rest of the requests are self explanatory. 