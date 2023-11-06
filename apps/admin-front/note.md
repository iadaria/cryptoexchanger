### server side event

The problem happens because default nextJs server compress everything by default.
Just add 'Content-Encoding': 'none' in your writeHead stage and everything should work as you wished.

links:

- https://dev.to/techfortified/realtime-data-streaming-using-server-sent-eventssse-with-reactjs-and-nodejs-2aak
