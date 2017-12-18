# Horror Club Movies :ghost: :scream: 

## Which movie should we watch on horror night?

[Our Horrifying App](https://fac-horror-night.herokuapp.com/)

### Task

- Build a server rendered full stack app using the Express framework.
- Use a PostgreSQL database to store and retrieve your data.
- Use the retrieved data to populate a Handlebars template for server-side rendering to be displayed on the front-end.

### User stories
As a user I want to...
- Securely log in or sign up 
- View suggested movies and see who has suggested the movie
- Add movie suggestions
- ‘Like’ movies and see how many likes a movie has
- View a description of a single movie on its own page

### Technical Spikes
We conducted a technical spike (see below) in order to:
- Use promises throughout the application
- Implement session management using middleware

We decided to use [pg-promise](https://www.npmjs.com/package/pg-promise) in order to get promises back from queries to your PostgresSQL database.

We also used [cookie-session](https://www.npmjs.com/package/cookie-session) middleware for session management. 

### Some things we learnt...
- Passing different levels of context to Handlebars
 eg: 
```
{{#each movies}}

    {{.../userId}}

{{/each}}
```
- How to pass context to partials
eg:
```
{{> navbar this}}
```
- SQL ‘RETURNING ID’ in query
- Using promises (pg-promise module)
- Using cookie-session

### Stretch Goals
- Populate the movie description through API calls to [MovieDB](https://www.themoviedb.org/documentation/api)
- Allow the user to comment on movie suggestions
