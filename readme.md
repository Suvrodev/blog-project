# Welcome to my **Blog Project**

**Project Name: `Blog Project`**

**Live url: https://blogserverr.vercel.app/**

##### [`Click Here To Go Link`](https://blogserverr.vercel.app/)

## Feature:

<!--Register -->

### At first have to say in this project have 2 role logged user

1.  ### User Role
2.  ### Admin Role

# Describing about login and register

- This backend project allows users register and which data keep in a MongoDB database.
- A schema pattern must be followed for register. The schema includes:

  - **name**
  - **email**
  - **password**
  - **role(autometically will be User)**
  - **isBlocked(autometically will be false)**

    **Example:**  
     `post request`

    ```bash
        https://blogserverr.vercel.app/api/auth/register
    ```

    `request body`

    ```bash
            {
               "name": "John Doe",
                "email": "john@example.com",
                "password": "securepassword"
            }
    ```

<!-- Login by user -->

- This backend project also allows to users login and which data retrive from MongoDB database
- A schema pattern must be followed for login. The schema includes:

  - **email**
  - **password**  
    **Example:**  
     `post request`

    ```bash
        https://blogserverr.vercel.app/api/auth/login
    ```

    `request body`

    ```bash
            {
                "email": "john@example.com",
                "password": "securepassword"
            }
    ```

## 👉 Describing role of user

<!-- create by user -->

- By login user can create blog
- A schema pattern must be followed for create blog. The schema includes:

  - **title**
  - **content**
  - **author(autometically will be logged user)**
  - **isPublished (autometically will be true)**

  **Example:**  
   `post request`

  ```bash
      https://blogserverr.vercel.app/api/blogs
  ```

  `request body`

  ```bash
          {
                "title": "My First Blog",
                "content": "This is the content of my blog."
          }
  ```

<!-- update by user -->

- By login user can update blog which is created by himself

  **Example**  
   `patch request`

  ```bash
     https://blogserverr.vercel.app/api/blogs/6765ce8cf3b9a1c4ad03021e
  ```

  `request body`

  ```bash
          {
                "title": "Updated Blog Title",
                "content": "Updated content."
          }
  ```

  <!-- delete by user -->

- By login user can delete any blog which is created by himself by providing the blog's specific `ID`.  
   **Example**  
   `delete request`

  ```bash
  https://blogserverr.vercel.app/api/blogs/6765cc7af3b9a1c4ad030216
  ```

   <!-- Get by ayone -->

- By login or without login whatever anyone can get all blogs  
  **Example**  
   `get request`

  ```bash
    https://blogserverr.vercel.app/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=60b8f42f9c2a3c9b7cbd4f18
  ```

  ## 🚫 Restriction of User

  - user can not delete other blog
  - user can not update other person's blog
  - A user can not blocked other user

## 👉 Describing role of Admin

- Only logined admin can delete any blog
  **Example**  
   `delete request`

  ```bash
     https://blogserverr.vercel.app/api/admin/blogs/6765ce8cf3b9a1c4ad03021e
  ```

- Only logined admin can delete any blog
  **Example**  
   `patch request`

  ```bash
      https://blogserverr.vercel.app/api/admin/users/6765cc7af3b9a1c4ad030216/block
  ```

  `request body`

  ```bash
        {
          "isBlocked":true
        }
  ```

  ## 🚫 Restriction of Admin

  - Can not create blog
  - can not update any blog

## 👨‍💻 Technology I have used:

- **npm**: I used npm (Node Packege Manager) to easily install, update, and manage the required packages and libraries in the project.
- **Express.js**: For server-side development.
- **MongoDB**: Database used for storing data.
- **Mongoose**: Used for database validation.
- **TypeScript**: Programming language used for type safety and better code maintainability.
- **dotenv**: For managing environment variables.
- **cors**: For handling cross-origin requests and security.
- **nodemon**: For auto-restarting the server after code changes.
- **zod**: For data validation.
- **zod**: For data validation.
- **Bcrypt**: For secure user password.
- **jwt**: For authetication loging user and authorization give access to user to do specific operation.
- **vercel**: For deploying the code to a cloud server.
- **MongoDB Compass**: For check database more fast.
- **No sql booster**: For check mongodb query.

## 🏹 Validate information:

### Authetication

For authentication I used jwt. by jwt a login user get a token for his enity or existance. According to jwt he can do operation which have his access. Without token he can not perform.
Without login if a user is hit api , he will get a error message as reponse

### Authorization

For User and Admin specific role I used authorization by jwt token. Admin can do some high securated work that why for check logged user is simple user or admin I used authorization which is performed by jwt token. And if Any simple user want to hit admin api he will get a error message by response

## 📢 Error messgae:

User will get error message as response for these type of error

- ZOD_ERROR
- NOT_FOUND_ERROR
- VALIDATION_ERROR
- AUTH_ERROR
- AUTHORIZATION_ERROR
- INTERNAL_SERVER_ERROR
