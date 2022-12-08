# container-network-demo

**A demo of joining two Docker containers to a network.** This demo involves two containers, one for an application and one for a database. Both containers are joined to the same [user-defined bridge network][bridge], so that the application container can fetch data from the database.

The application itself is a simple Node.js application that uses the [Express](https://expressjs.com/) framework. It exposes a REST API at `localhost:8080/addresses` that fetches a list of addresses from the Postgresql database. 

The database is populated with a few sample addresses in the file `db/init.sql`. Feel free to add your own addresses to the database before running the instructions below, and see if they show up in the API response!

## To run

**Pre-requisites:** You must have Docker installed on your machine.

To try out this demo, first build the images:

```bash
docker build -t address-api app

docker build -t address-db db
```

Then create a bridge network, and run the containers:

```bash
docker network create address-app

docker run -d --name address-db --network address-app address-db:latest

docker run -d --name address-api --network address-app address-api:latest
```

Now you can test the application from another container; we'll use an [Alpine Linux][alpine] container for this:

```bash
docker run -it --rm --network address-app alpine:latest
```

Then, **inside the Alpine container,** install the **curl** command, and use it to test the API:

```bash
apk add --no-cache curl

curl address-api:3000/addresses
```

You should see output like this, which proves that the application container has successfully fetched data from the database container:

```json
[{"id":1,"first_name":"John","last_name":"Doe","email":"john@example.com","phone":"555-555-5555"},{"id":2,"first_name":"Jane","last_name":"Doe","email":"jane@example.com","phone":"555-555-5557"},{"id":3,"first_name":"Susan","last_name":"Smith","email":"susan@example.com","phone":"555-555-5558"},{"id":4,"first_name":"Bob","last_name":"Smith","email":"bob@example.com","phone":"555-555-5559"}]
```

## Cleanup

To stop and remove the containers, and remove the network:

```bash
docker stop address-api address-db

docker rm address-api address-db

docker network rm address-app
```

## License

[MIT][license]

[alpine]: https://alpinelinux.org/
[bridge]: https://docs.docker.com/network/bridge/
[license]: LICENSE
