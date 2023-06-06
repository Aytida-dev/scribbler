# Scribbler Blog Site Documentation

## Introduction

Scribbler is a feature-rich blog site that allows users to create, edit, and manage their blogs. It offers a user-friendly interface with beginner-friendly UI elements and a responsive design. With Scribbler, users can write blogs using Markdown language, upload thumbnail images for their blogs, and interact with other users by viewing their profiles.

It is made using `react+javascript+chakra_UI` from VITE as frontend and `node+express+mongodb` as backend.

## Table of Contents

1. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running the Application](#running-the-application)
2. [Features](#features)
   - [User Profile with Avatars](#user-profile-with-avatars)
   - [Markdown Editor for Blog Writing](#markdown-editor-for-blog-writing)
   - [Thumbnail Images for Blogs](#thumbnail-images-for-blogs)
   - [CRUD Operations](#crud-operations)
   - [Viewing Other User Profiles](#viewing-other-user-profiles)
   - [Dark Mode](#dark-mode)
   - [Responsive Design](#responsive-design)
   - [Infinite Scrolling](#infinite-scrolling)
   - [Skeletons Everywhere](#skeletons-everywhere)
   - [Custom Alerts](#custom-alerts)
   - [Beginner-Friendly UI](#beginner-friendly-ui)
3. [Conclusion](#conclusion)

## Getting Started

### Prerequisites

- Node.js (v12 or above)
- MongoDB (Make sure MongoDB is installed and running on your system)

### Installation

1. Clone the Scribbler repository from GitHub:

```
git clone https://github.com/your-username/scribbler.git

```

2. Navigate to the project directory:

```
cd scribbler
```

3. It has two folders: `client` and `server`.First Navigate to the `server` folder:

```
cd server

```

4. add a .env file in the server folder and add the following code in it:

```
MONGO_URI = <your mongodb url>
PORT = <desired port>
JWT_SECRET = <your jwt secret>

```

5. Install the dependencies:

```
npm install

```

6. Start the server:

```
npm run test

```

7. Server should be now running on your desired port.

8. Open another terminal and navigate to the `client` folder:

```
cd client

```

9. Add a .env file in the client folder and add the following code in it:

```
VITE_API_URL = http://localhost:<your port>

```

10. Install the dependencies:

```
npm install

```

11. Start the client:

```
npm run dev

```

12. Client should be now running on your port.
