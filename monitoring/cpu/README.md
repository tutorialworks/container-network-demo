# container-monitoring-demo

This is a demo of how to monitor containers with simple Docker commands.

## To run

**Pre-requisites:** You need to have Docker installed and running first. See [Docker's installation instructions](https://docs.docker.com/engine/installation/) for more information.

Once you've cloned this repo, run this to build the demo app:

```bash
docker build -t highcpu-go highcpu-go

docker run --rm --name highcpu-go -d highcpu-go
```

### Monitoring with docker stats

The app is designed to oscillate between using 100% CPU and 0% CPU.

You can see the container's CPU usage with `docker stats`. We'll run the command with a screen refresh interval of 1 second:

```bash
docker stats --interval 1
```

You should see something like this:

```bash
ID            NAME         CPU %       MEM USAGE / LIMIT  MEM %       NET IO       BLOCK IO    PIDS        CPU TIME      AVG CPU %
2b56db050efb  highcpu-go   99.97%      528.4kB / 16.47GB  0.00%       430B / 110B  0B / 0B     4           2m20.636994s  50.09%
```

You should see the CPU column increase and decrease over time.

### Monitoring with docker top

You can also monitor the individual process inside the container with `docker top`:

```bash
docker top highcpu-go
```

You should see something like this:

```bash
USER        PID         PPID        %CPU        ELAPSED         TTY         TIME        COMMAND
root        1           0           50.130      6m26.99324902s  ?           3m14s       ./highcpu-go
```

You should see the CPU column increase and decrease over time.

### Monitoring with docker logs

You can also monitor the container's logs with `docker logs`:

```bash
docker logs -f highcpu-go
```

