## errors
almost concrete example in policies settings
mieux dans parkingCreate mais abandonné car trop complexe
suffisant dans phoneNumbers !!
on verra un système plus complet quand les erreurs seront bien retournées !

error = verification du formulaire avant appel api
errors = retour api

auth services pages
authUsers
Externals
Policies
PoliciyGroups

dird service pages
phonebooks

### authUsers
error.message= {
    "message": {
        "emails": {
            "0": {
                "address": [
                    {
                        "message": "Not a valid email address.",
                        "constraint_id": "type",
                        "constraint": "email"
                    }
                ]
            }
        }
    },
    "error_id": "invalid-data",
    "details": {},
    "timestamp": 1731395934.4557476,
    "resource": "emails"
}

### policies
error = {
    "message": "Unauthorized",
    "error_id": "unauthorized",
    "details": {
        "invalid_token": "4a02bf7f-933e-49fd-9641-f7b6387d4ae8",
        "required_access": "sdfxd"
    },
    "timestamp": 1731408169.1547406
}

### phonebooks
error.message: = {
    "reason": [
        "{'name': ['Missing data for required field.']}"
    ],
    "timestamp": [
        1731406728.6230316
    ],
    "status_code": 400
}

### expected
format qu'on pourrait avoir
{
  "status": "error",
  "errors": [
    {
      "code": "VALIDATION_ERROR",          // aka error_id
      "field": "email",                    // aka ressource or constraint
      "message": "Invalid email format",   // aka message
      "detail": "invalid_email_format"     // aka code message for translation
    },
    {
      "code": "REQUIRED_FIELD",
      "field": "password",
      "message": "Password is required",
      "detail": "required_password"
    },
    {
      "code": "UNIQUE_CONSTRAINT",
      "field": "username",
      "message": "Username already taken",
      "detail": "username_taken"
    },
    {
      "code": "UNAUTHORISED",
      "field": "token",
      "message": "you are not unauthorized",
      "detail": "unauthorized_token"
    }
  ]
}

## authd

### declaration
https://github.com/wazo-platform/wazo-auth/blob/55690e33c6c7e6744f9ceac32e179df77d6cc786/wazo_auth/exceptions.py

### raised
https://github.com/wazo-platform/wazo-auth/blob/55690e33c6c7e6744f9ceac32e179df77d6cc786/wazo_auth/services/authentication.py#L119

## confd

### api exception
https://github.com/wazo-platform/wazo-confd/blob/c8a4a3350c732929d4c617b0593a6cde9373eac5/wazo_confd/helpers/common.py#L25-L59

### breaking change
this is a significant breaking change in the API. Not sure how we should deal with such a change, .e.g should it deserve a new API version update.

The whole scope would be something like:
change this code
rewrite test logic that expect the list error format
rewrite API spec definition of the error response schema:
https://github.com/wazo-platform/wazo-confd/blob/c8a4a3350c732929d4c617b0593a6cde9373eac5/wazo_confd/plugins/api/api.yml#L584-L587

check other wazo components interacting with confd for any reliance on the old error format