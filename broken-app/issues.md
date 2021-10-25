# Broken App Issues
- Errors not being handled for '/' post route. Variable 'err' was not defined and was not passed into catch.
- '/' post route was not checking for developers to be submitted in the body of the request.
- '/' post route wasn't waiting for requests to github to finish before trying to access the data.

## Changes Made
- Passed 'err' into catch of '/' post route.
- Added error handling for when no developer data is submitted on '/' post route
- Made it so all requests happen simultaneosly in '/' post route and then get accessed only after they are finished.
- Changed variables to be const instead of var or let
- Added general error handling system
- Added 404 handling
- Changed to external server file