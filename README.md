# Node Auth Boilerplate

This is a boilerplate for an Express app with local user authentication. It exists so I have a customized boilerplate to use for my future projects.

## What It Includes

* Local Auth (email and password)
* Passport and passport-local
* Sessions for saving user info and displaying flash messages
* Settings for PostgreSQL and Sequelize
* Hashed passwords
* EJS templating and EJS layouts
* Sequelize user model
* Materialize styling - nav and footer

## Included Models

**User Model**

| Column | Type | Notes |
|-------------|------------|-----------------------------------|
| id | Integer | Serial primary key |
| firstname | String | Required length > 1 |
| lastname | String | - |
| email | String | Unique Login |
| password | String | Hash |
| birthday | Date | - |
| displayname | String | - |
| admin | Boolean | Defaulted to False |
| pic | String | - |
| bio | Text | - |
| createdAt | Date | Automatically added by sequelize |
| updatedAt | Date | Automatically added by sequelize |

## Included Routes

**Routes in index.js**
| Method | Path | Purpose |
| ------ | -------------------- | ----------------------------- |
| GET | `/` | Home Page |
| GET | `*` | Catch-all for 404s |

**Routes in controllers/auth.js**
| Method | Path | Purpose |
| ------ | -------------------- | ----------------------------- |
| GET | `/auth/login` | Render login form |
| POST | `/auth/login` | Process login data |
| GET | `/auth/signup` | Render signup form |
| POST | `/auth/signup` | Process signup data |
| GET | `/auth/logout` | Remove user from session + redirect |

**Routes in controllers/profile.js**
| Method | Path | Purpose |
| ------ | -------------------- | ----------------------------- |
| GET | `/profile/user` | Show user dashboard (authorized user only) |
| GET | `/profile/admin` | Show admin dashboard (authorized admin only) |
| GET | `/profile/guest/:id` | Show user dashboard as guest (authorized user only) |


## Directions For Use

### 1. Clone the repository with a different name

Run the following command on the terminal:

```sh
git clone <repo_link> <new_name>
```

**For example**

```sh
git clone https://github.com/garedb/node-auth-boiler.git new-project-name
```

### 2. Install the modules for package.json

```sh
npm i
```

### 3. Customize the new project

Remove the default parameters. For example:

* Title in `layout.ejs`
* Logo in the nav bar
* Description and Repository fields in `package.json`
* Remove this boilerplate's readme content
* Switch Favicon to project-specific one (in `layout.ejs` head section)


### 4. Create a new database for the new project

```sh
createdb <new_db_name>
```

**For example**

```sh
createdb new-project-db
```
