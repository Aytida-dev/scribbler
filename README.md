# Scribbler Blog Site Documentation

## Introduction

Scribbler is a feature-rich blog site that allows users to create, edit, and manage their blogs. It offers a user-friendly interface with beginner-friendly UI elements and a responsive design. With Scribbler, users can write blogs using Markdown language, upload thumbnail images for their blogs, and interact with other users by viewing their profiles.

It is made using `react+javascript+chakra_UI` from VITE as frontend and `node+express+mongodb` as backend.

## Table of Contents

1. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
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

12. Client should be now running on your port open the browser and go to `http://localhost:<PORT>` to view the site.

## Features

### CRUD Operations

- Scribbler is a fully functional CRUD (Create, Read, Update, Delete) application.
- Users can create new blogs, view their own blogs, edit existing blogs, and delete unwanted blogs.

### User Profile with Avatars

- Users can create and customize their profiles with avatars.
- Avatars provide a visual representation of the user across the site.
- Users can update their profile information, including name, bio, and avatar image.

### Markdown Editor for Blog Writing

- Scribbler offers a markdown editor that allows users to write blogs using the Markdown language.
- The markdown editor provides a simplified and intuitive interface for creating richly formatted blog content.

### Thumbnail Images for Blogs

- Users can upload and attach thumbnail images to their blogs.
- Thumbnail images provide visual representation and attract readers to the blog.

### Viewing Other User Profiles

- Users can explore and view profiles of other users.
- This feature allows users to discover and connect with fellow bloggers on the platform.

### Dark Mode

- Scribbler offers a dark mode option for users who prefer a darker color scheme.
- The dark mode enhances readability and reduces eye strain in low-light environments.

### Responsive Design

- Scribbler is designed to be fully responsive, ensuring a seamless experience across various devices and screen sizes.
- Users can access and interact with the blog site from their desktops, tablets, and mobile devices.

### Infinite Scrolling

- Scribbler implements infinite scrolling, allowing users to scroll through an endless stream of blogs.
- As users reach the end of the current blog list, more blogs are dynamically loaded, providing a smooth browsing experience.

### Skeletons Everywhere

- Skeleton screens are used throughout Scribbler to enhance the user experience while content is being loaded.
- Skeleton screens provide visual placeholders that mimic the structure of the content, giving users a sense of progress and responsiveness.

### Custom Alerts

- Scribbler incorporates custom alerts to provide informative feedback and notifications to users.
- Alerts are used to confirm successful actions, notify errors, and guide users through different interactions within the site.

### Beginner-Friendly UI

- The user interface of Scribbler is designed with beginners in mind, ensuring a user-friendly experience for users who are new to blogging.
- The UI elements are intuitive and easy to navigate, enabling users to focus on their writing and interaction with the platform.

## Conclusion

Feel free to contribute to this project and make it better. If you have any doubts or want to contact me, you can reach me at [my email](mailto:aytida.dev@gmail.com).
