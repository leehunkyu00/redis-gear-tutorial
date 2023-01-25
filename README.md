# Redis Gear Tutorial

## Server

```
$ docker run -p 6379:6379 redislabs/redisgears:edge
Unable to find image 'redislabs/redisgears:edge' locally
edge: Pulling from redislabs/redisgears
6e3729cf69e0: Pull complete
a16927d8415b: Pull complete
c776caf2fde8: Pull complete
6353be393454: Pull complete
a9f8dd4b853f: Pull complete
c4b5295da8bf: Pull complete
0464413b0603: Pull complete
7251ca0e4fa1: Pull complete
5f740c11b9e8: Pull complete
Digest: sha256:787ad3ab6ed5bfe401da513680c41e4c6d8f1a26d4878b1ced53761a4287bea6
Status: Downloaded newer image for redislabs/redisgears:edge
docker: Error response from daemon: driver failed programming external connectivity on endpoint peaceful_perlman (2220e42e279f0dee7b616fd362cfe7abb4dcb2cf1e3b6c80e903b432aae5e2b9): Error starting userland proxy: listen tcp4 0.0.0.0:6379: bind: address already in use.
ERRO[0093] error waiting for container: context canceled

```

### port가 겹친다면, 
```
$ docker run -p 16379:6379 redislabs/redisgears:edge
1:C 25 Jan 2023 00:33:06.664 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
1:C 25 Jan 2023 00:33:06.664 # Redis version=7.0.3, bits=64, commit=76b9c13d, modified=0, pid=1, just started
1:C 25 Jan 2023 00:33:06.664 # Configuration loaded
1:M 25 Jan 2023 00:33:06.665 * monotonic clock: POSIX clock_gettime
1:M 25 Jan 2023 00:33:06.665 * Running mode=standalone, port=6379.
1:M 25 Jan 2023 00:33:06.665 # Server initialized
1:M 25 Jan 2023 00:33:06.665 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
1:M 25 Jan 2023 00:33:06.667 * <redisgears_2> Detected redis oss
1:M 25 Jan 2023 00:33:06.667 # <redisgears_2> could not initialize RedisAI_InitError

1:M 25 Jan 2023 00:33:06.667 * <redisgears_2> Failed loading RedisAI API.
1:M 25 Jan 2023 00:33:06.667 * <redisgears_2> RedisGears v99.99.99, sha='2284ecae217c0c00bece73e67b4a7d757ea84b85', branch='master', build_type='release', built_on='linux-ubuntu.22.4.0-x86_64'.
1:M 25 Jan 2023 00:33:06.669 * <redisgears_2> registering backend: js
1:M 25 Jan 2023 00:33:06.670 * <redisgears_2> Created new data type 'GearsType'
1:M 25 Jan 2023 00:33:06.670 * Module 'redisgears_2' loaded from ./target/release/libredisgears.so
1:M 25 Jan 2023 00:33:06.671 * Ready to accept connections
```

## Client
https://hub.docker.com/r/redislabs/redisgears/

```
$ vi lib.js
$ redis-cli ^C RG.FUNCTION LOAD < ./lib
$ ls
lib.js
$ cat ./lib.js
#!js name=lib

redis.register_function('hello_world', function(){
    return 'hello_world';
});
$ redis-cli -p 16379 -x RG.FUNCTION LOAD < ./lib.js
OK
$ redis-cli -p 16379 RG.FCALL lib hello_world 0
"hello_world"
$ vi lib.js
$ redis-cli -p 16379 -x RG.FUNCTION LOAD < ./lib.js
(error) Library lib already exists
$ redis-cli -p 16379 -x RG.FUNCTION LOAD UPGRADE < ./lib.js
OK
$ redis-cli -p 16379 RG.FCALL lib my_ping 0
"PONG"
```

