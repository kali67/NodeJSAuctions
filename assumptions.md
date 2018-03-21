# Assumptions

# Photos
* I have assumed that an auction can have only one photo at a time and any attempt to add another photo will result in a bad request.
* A photo has to be added to and auction (there is no default photo).


# Creation of User and Auctions
* All fields in the body (of API Specs) are requried and will throw a malformed request if not all are provided

# Authorization
* Authorization is checked first on PATCH auction and user, hence giving a ID that doesnt exist will return 401 Unauthorized rather than not found. A user should not be able to know if a user ID exists.
* This is the same for PATCH on an auction that has already started. Auth is checked first before this check, hence will get Unauthorized first

# Auctions
*start index of 0 will be the first item in the list