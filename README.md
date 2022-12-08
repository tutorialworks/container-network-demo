# docker-network-demo

**A demo of joining two Docker containers to a network.** This demo involves two containers, one for an application and one for a database. Both containers are joined to a _user-defined bridge network_, and the application container fetches data from the database.

The application itself is a simple Node.js application that uses the [Express](https://expressjs.com/) framework. It exposes a REST API at `localhost:8080/addresses` that fetches a list of addresses from the Postgresql database.

## To run

To try out this demo, first build the images:

```bash
docker build -t address-book app

docker build -t address-db db
```

Then create a bridge network, and run the containers:

```bash
docker network create address-app

docker run -d --name address-db --network address-app address-db:latest

docker run -d --name address-book --network address-app address-book:latest
```

Now you can test the application from another container; we'll use an Alpine Linux container for this:

```bash
docker run -it --rm --network address-app alpine:latest
```

Then inside the Alpine container, install the **curl** command, and use it to test the API:

```bash
apk add --no-cache curl
curl address-book:3000/addresses
```

You should see output like this, which proves that the application container has successfully fetched data from the database container:

```json
[{"id":1,"first_name":"John","last_name":"Doe","email":"john@example.com","phone":"555-555-5555"},{"id":2,"first_name":"Jane","last_name":"Doe","email":"jane@example.com","phone":"555-555-5557"},{"id":3,"first_name":"Susan","last_name":"Smith","email":"susan@example.com","phone":"555-555-5558"},{"id":4,"first_name":"Bob","last_name":"Smith","email":"bob@example.com","phone":"555-555-5559"}]
```

## Cleanup

```bash
$ docker stop address-book address-db
$ docker rm address-book address-db
$ docker network rm address-app
```

## License

MIT
