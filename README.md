# 🚀 Notification Service

## Description

This is a full-stack Notification Service project with both **Frontend** and **Backend** components.

- The **Frontend** is built using **React.js** and provides a modern UI to send and fetch notifications.
- The **Backend** is developed with **Node.js** and connected to **MongoDB** for data storage.
- The API was tested using **Postman** for proper request handling.
- **RabbitMQ** is integrated for queuing notifications asynchronously.
- Retry functionality is implemented to ensure message delivery reliability in case of temporary failures.




# Fontend
## 🛠️ Frontend `.env` Configuration

Create a `.env` file in your frontend root directory and add the following:

```env
VITE_API_BASE_URL=https://your-deployed-backend-url.com
VITE_API_BASE_URL=http://localhost:5000
```
Make sure the URL matches your backend server's address. Use environment-specific URLs when deploying

## ⚛️ Start the **Frontend**

To launch the React frontend:

```bash
npm run dev
```
![Screenshot 2025-05-18 195512](https://github.com/user-attachments/assets/984f6e35-6ac9-4d1d-a3be-e4416f85eadf)
![Screenshot 2025-05-18 195338](https://github.com/user-attachments/assets/81b2316d-2bd0-454a-89a5-107e62753aac)
![image](https://github.com/user-attachments/assets/c1e7896c-088f-4965-bbf7-4b6ba2eb6b93)





# Backend

## ⚙️ Backend `.env` Configuration

Create a `.env` file in your backend root directory and add the following:

```env
PORT=5000
MONGODB_URI=mongodb+srv://shivamsingh747804:Pass%40123@cluster0.smh4pwg.mongodb.net/notificationservice
RABBITMQ_URL=amqp://localhost
```
Make sure RabbitMQ is running locally or replace the URL with your deployed RabbitMQ instance if using a cloud service.

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
## 🧭 Setup RabbitMQ Management Dashboard (Web UI)

### Step 1: Locate Installation Folder
- Find the folder where you installed **RabbitMQ** (usually something like `C:\Program Files\RabbitMQ Server\rabbitmq_server-x.y.z`)
- Copy the full path of the `sbin` directory (e.g., `C:\Program Files\RabbitMQ Server\rabbitmq_server-3.12.1\sbin`)

### Step 2: Enable Management Plugin
- Open a **new Command Prompt as Administrator**
- Navigate to the `sbin` folder using the path you copied:

```bash
cd "C:\Program Files\RabbitMQ Server\rabbitmq_server-3.12.1\sbin"
```

Run this command to enable the management plugin:
```
rabbitmq-plugins enable rabbitmq_management
```
You should see output like:
```
The following plugins have been enabled:
  rabbitmq_management
Applying plugin configuration to rabbitmq-server...
```

Close all open Command Prompts
- Open a **new Command Prompt as Administrator**
- Navigate to the `sbin` folder using the path you copied:

```bash
cd "C:\Program Files\RabbitMQ Server\rabbitmq_server-3.12.1\sbin"
```

Type:

```
rabbitmq-server.bat
```


 Your RabbitMQ server started successfully. The message:
 ```
alarm_handler: {set,{{disk_almost_full,"C:\\"},[]}}


\=INFO REPORT==== 17-May-2025::22:41:20.014000 ===
alarm\_handler: {set,{system\_memory\_high\_watermark,\[]}}
2025-05-17 22:41:26.377000+05:30 \[notice] <0.45.0> Application syslog exited with reason: stopped
2025-05-17 22:41:26.424000+05:30 \[notice] <0.213.0> Logging: switching to configured handler(s); following messages may not be visible in this log output

## ##      RabbitMQ 4.1.0

##

\##########  Copyright (c) 2007-2025 Broadcom Inc and/or its subsidiaries

######

\##########  Licensed under the MPL 2.0. Website: [https://rabbitmq.com](https://rabbitmq.com)

Erlang:      27.3.4 \[jit]
TLS Library: OpenSSL - OpenSSL 3.1.0 14 Mar 2023
Release series support status: see [https://www.rabbitmq.com/release-information](https://www.rabbitmq.com/release-information)

Doc guides:  [https://www.rabbitmq.com/docs](https://www.rabbitmq.com/docs)
Support:     [https://www.rabbitmq.com/docs/contact](https://www.rabbitmq.com/docs/contact)
Tutorials:   [https://www.rabbitmq.com/tutorials](https://www.rabbitmq.com/tutorials)
Monitoring:  [https://www.rabbitmq.com/docs/monitoring](https://www.rabbitmq.com/docs/monitoring)
Upgrading:   [https://www.rabbitmq.com/docs/upgrade](https://www.rabbitmq.com/docs/upgrade)

Logs: <stdout>
c:/Users/Ganpati Shivam/AppData/Roaming/RabbitMQ/log/rabbit\@LAPTOP-331ELHSP.log

Config file(s): (none)

Starting broker... completed with 0 plugins.
```


📊 Enable RabbitMQ Management Dashboard (Optional but Recommended)
Access the dashboard at:


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

### 📤 Response (Example)

```json
{
  "success": true,
  "count": 2,
  "notifications": [
    {
      "_id": "66487f1bffdd9e482ef55c9b",
      "type": "email",
      "userId": "user123",
      "recipient": "example@gmail.com",
      "subject": "Test Subject",
      "message": "Hello from email",
      "createdAt": "2025-05-18T08:45:31.871Z",
      "__v": 0
    },
    {
      "_id": "66487f09ffdd9e482ef55c9a",
      "type": "sms",
      "userId": "user123",
      "recipient": "+911234567890",
      "subject": "",
      "message": "Test SMS message",
      "createdAt": "2025-05-18T08:45:13.474Z",
      "__v": 0
    }
  ]
}
```
