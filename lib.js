#!js name=lib

redis.register_function('hello_world', function(){
	return 'hello_world';
});

redis.register_function('my_ping', function(client) {
	return client.call('ping');
});
