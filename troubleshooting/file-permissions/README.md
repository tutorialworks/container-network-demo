# Container Troubleshooting: File Permissions issues

This demo uses a fake web app called **Firebox** (sorry, Dropbox!) that allows you to upload files. The web app is written in Python using the Flask framework and runs in a Docker container.

## To run

```shell
docker build -t file-permissions .

docker run -p 5000:5000 file-permissions
```

Now access the web app in your web browser: <http://localhost:5000> and try to upload a file. 

**You'll see that the file upload fails. But why?**

### To debug

To debug, we'll need to get the ID of the container. Run `docker ps` to get the container ID:

```shell
docker ps
```

Look for the container that has the image `file-permissions` and copy the container ID.

**Look at the logs.** First let's check out the logs:

```shell
docker logs <container-id>
```

We see something like this:

> 10.0.2.100 - - [10/Dec/2022 16:10:31] "POST /upload HTTP/1.1" 500 -  
> ...  
> PermissionError: [Errno 13] Permission denied: '/app/uploads/5sdfkhfweiohj.jpeg'

Oh no!

**Look at the folder inside the container.** Perhaps the folder inside the container will give us some clues. Start a shell inside the container and see what's going on.

```shell
docker exec -it <container-id> sh
```

Once inside the container, list the contents of the `/app/uploads` folder. Add the `-a` flag to show hidden files and folders and `-l` to show the permissions:

```shell
/ $ ls -al /app/uploads
total 0
drwxr-xr-x    1 root     root             0 Dec 10 16:09 .
drwxr-xr-x    1 root     root            18 Dec 10 16:10 ..
```

The folder is empty! A-ha! But notice that the permissions are `drwxr-xr-x`, with the owner `root`. This means that the folder is owned by the `root` user, and that the `root` user has read, write, and execute permissions. 

**Check: is our app running as root in the container?** Let's check the user that we're running as. Staying inside the shell in the container, run this command:

```bash
/ $ whoami
filebox
```

So we're not running as `root`. But we are running as the `filebox` user. Let's check the permissions of the `filebox` user:

```bash
/ $ id filebox
uid=100(filebox) gid=101(apps) groups=101(apps),101(apps)
```

The `filebox` user has a UID of 1000 and is in the `apps` group. It's not `root`.

Since the `uploads` folder is owned by the `root` user, the `filebox` user does not have permission to write to the folder.

### To fix

We can't just change the permissions of the folder inside the container while it's running, because the permissions will be reset when the container is restarted. We need to change the permissions of the folder every time the container starts.

**Change the permissions of the folder in the Dockerfile.** Let's change the permissions of the `uploads` folder by editing the _Dockerfile_. Replace the line that says `RUN mkdir -p /app/uploads` with this:

```dockerfile
RUN mkdir -p /app/uploads && chown -R filebox:apps /app/uploads
```

**Terminate and rebuild.** Now let's rebuild the image and run the container again. Press Ctrl+C to exit the container, then stop the container:

```bash
docker stop <container-id>
```

Then rebuild the image and run the container again:

```bash
docker build -t file-permissions .

docker run -p 5000:5000 file-permissions
```

Now try to upload a file again at <http://localhost:5000>

**Success!**

**Confirm the file was saved.** Let's start a shell inside the container and find the file in the `/app/uploads` folder. (Don't forget that you can get the container ID by running `docker ps`).

```bash
docker exec -it <container-id> /bin/bash
```

```bash
/ $ ls -al /app/uploads/
drwxr-xr-x    1 filebox  apps            82 Dec 10 16:32 .
drwxr-xr-x    1 root     root            14 Dec 10 16:31 ..
-rw-r--r--    1 filebox  apps       2036567 Dec 10 16:32 henlobird.jpeg
```

## Wrapping up

In this demo, we saw how to debug a file permissions issue in a container. 

We saw that the problem was that the app was trying to write to a folder that was owned by the `root` user, and that the app's user (`filebox`) didn't have permission to write to the folder. We fixed the problem by changing the permissions of the folder in the _Dockerfile_.

It's good security practice to run your container as a non-root user. But if you do, you can encounter some annoying permissions issues! So it's important to know how to debug these issues.


