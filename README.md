# Insider Threat Detection

## Overview

Insider Threat Detection is a web-based application designed to identify suspicious user activities within an organization by analyzing behavioral patterns. The system monitors user actions, evaluates activity logs, and highlights potentially malicious behavior that may indicate an insider threat.

## Features

* User activity monitoring
* Behavioral analysis of employee actions
* Detection of suspicious activities
* Interactive dashboard for visualization
* Activity log management using JSON data
* Responsive user interface

## Technologies Used

### Frontend

* HTML
* CSS
* JavaScript
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Data Storage

* JSON-based activity logs (`activities.json`)

## Project Structure

```text
Insider-Threat-Detection/
│
├── activities.json      # Stores user activity records
├── app.js               # Frontend application logic
├── server.js            # Backend server
├── index.html           # Main UI page
├── styles.css           # Styling
├── tailwind.config.js   # Tailwind configuration
├── package.json         # Project dependencies
└── README.md            # Project documentation
```

## How It Works

1. User activities are recorded and stored.
2. The server processes activity data.
3. Behavioral patterns are analyzed.
4. Suspicious activities are flagged.
5. Results are displayed through the web interface.

## Installation

Clone the repository:

```bash
git clone https://github.com/Vadlakarthikasri/Insider-Threat-Detection.git
```

Navigate to the project directory:

```bash
cd Insider-Threat-Detection
```

Install dependencies:

```bash
npm install
```

Start the server:

```bash
node server.js
```

Open your browser and visit:

```text
http://localhost:3000
```

## Future Enhancements

* Machine Learning based anomaly detection
* Real-time alert notifications
* User authentication and authorization
* Database integration (MongoDB/MySQL)
* Risk score visualization dashboards
* Email and SMS alert systems

## Author

Karthikaari

## License

This project is developed for educational and research purposes.
