# Interstate Home Builder 
An application that lets you select different options for the interior and exterior design of your future home.


## Plan Attributes
- `planName`: name of plan
- `pickedExtdoor`: exterior door choice
- `pickedIntDoor`: interior door choice
- `pickedExtSiding`: siding sample choice
- `pickedFlooring`: flooring sample choice
- `pickedCountertop`: countertop sample choice


### Plan Schema
- `planName`: String
- `pickedExtdoor`: String (image)
- `pickedIntDoor`: String (image)
- `pickedExtSiding`: String (image)
- `pickedFlooring`: String (image)
- `pickedCountertop`: String (image)
- `date`: Date


## User Attributes
- `name`: User's full name
- `email`: User's email
- `password`: User's encrypted password


### User Schema
- `name`: String
- `email`: String
- `password`: String



## Web App Endpoints
Resource | GET | POST | PUT | DELETE | OPTIONS
------------ | ------------- | ------------- | ------------- | ------------- | -------------
/plans | List | Create |  | | |
/plans/id | | | Update | Delete | |
/users | List | Create | | | |

#### Libraries/Middlewares
- Body Parser
- Mongoose
- MomentJS
- Cors
- ExpressJS


