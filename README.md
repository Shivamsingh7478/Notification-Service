# 🚀 Notification Service

## Description

This is a full-stack Notification Service project with both **Frontend** and **Backend** components.

- The **Frontend** is built using **React.js** and provides a modern UI to send and fetch notifications.
- The **Backend** is developed with **Node.js** and connected to **MongoDB** for data storage.
- The API was tested using **Postman** for proper request handling.
- **RabbitMQ** is integrated for queuing notifications asynchronously.
- Retry functionality is implemented to ensure message delivery reliability in case of temporary failures.




# Fontend
## ⚛️ Start the **Frontend**

To launch the React frontend:

```bash
npm run dev
```
![Screenshot 2025-05-18 195512](https://github.com/user-attachments/assets/984f6e35-6ac9-4d1d-a3be-e4416f85eadf)
![Screenshot 2025-05-18 195338](https://github.com/user-attachments/assets/81b2316d-2bd0-454a-89a5-107e62753aac)
![image](https://github.com/user-attachments/assets/c1e7896c-088f-4965-bbf7-4b6ba2eb6b93)


# Backend

## 🐇 RabbitMQ & Erlang Setup

To enable queuing and retry capabilities, RabbitMQ and Erlang must be properly installed and configured on your system.

### ✅ Prerequisites
RabbitMQ requires Erlang to be installed beforehand.

- 🔗 [Download Erlang](https://www.erlang.org/downloads)
- 🔗 [Download RabbitMQ](https://www.rabbitmq.com/download.html)

### 🧪 Check Erlang Installation

Open a terminal and run:

```bash
erl
```
If Erlang is installed, you should see something like:
```
csharp

Erlang/OTP 25 [erts-13.0] ...
Eshell V13.0  (abort with ^G)
1>
```
To exit the shell:
```
arduino

Ctrl + C, then press A
```

🚀 Start RabbitMQ Server
On Windows (command line):

Start in the foreground:

```bash

rabbitmq-server
```
Run as a background Windows service:

```bash

rabbitmq-service start
```
Stop the service:

```bash

rabbitmq-service stop
```
📊 Enable RabbitMQ Management Dashboard (Optional but Recommended)
To enable the web UI:

```bash

rabbitmq-plugins enable rabbitmq_management
```
Access the dashboard at:

arduino
```
http://localhost:15672
```
Default credentials:
```
Username: guest

Password: guest
```


## ⚙️ Running the Worker

After setting up MongoDB and RabbitMQ, open a new terminal window and run:

```bash
node worker.js
```

you will see like this
```
Worker connected to MongoDB
Worker waiting for messages...
```
After entering data, you will see all the details 
```Terminal
Received: {
  type: 'sms',
  userId: 'user127',
  recipient: '+911234567689',
  subject: '',
  message: 'Hello'
}
Worker Error: Simulated SMS failure
Retrying (#1)...
Received: {
  type: 'sms',
  userId: 'user127',
  recipient: '+911234567689',
  subject: '',
  message: 'Hello',
  retryCount: 1
}
```
## 🚀 Running the Backend Server

In a **new terminal**, start the backend server with the following command:

```bash
npm run dev
```

You should see an output similar to this if everything is working correctly:

```Terminal
> notification-service@1.0.0 dev
> nodemon app.js

[nodemon] 3.1.10
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node app.js`
(node:6152) [MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option: useNewUrlParser has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
(node:6152) [MONGODB DRIVER] Warning: useUnifiedTopology is a deprecated option: useUnifiedTopology has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
RabbitMQ connected and channel created
Server running on port 5000
MongoDB Connected: ac-gpda3dv-shard-00-00.smh4pwg.mongodb.net
```

## 📬 API Endpoints

### ➕ POST Notification

Send a notification to be queued and processed.

```http
POST http://localhost:5000/api/notifications
```

Request Body Example:

```json

{
  "type": "sms",
  "userId": "user123",
  "recipient": "+911234567890",
  "subject": "",
  "message": "Hello from Notification Service!"
}
```

## 📥 GET User Notifications
Retrieve all notifications for a specific user.
```http
GET http://localhost:5000/users/user123/notifications
```
