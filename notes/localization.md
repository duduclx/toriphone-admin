# localization

https://wazo-dev.atlassian.net/browse/WAZO-4156

The /localization API allows setting a tenant country, also exposed through user’s country attribute in /users API.

This attribute was first introduced for the purpose of providing localized ringback tones for end-users by client applications.

This setting is now also used for phone number manipulations, where parsing a phone number may require a geolocal context for disambiguation(if a number is not in E.164, it may be interpretable only given the geographic context of use).

This includes 

outgoing caller id formatting

normalization of stored phone numbers

reverse lookups from incoming caller id number to stored numbers in directories, involving reformatting

blocklist screening, where incoming caller id number needs to be parsed and normalized to E.164 in order to be looked up in blocklist API

These use cases requiring normalisation and geographic locale awareness also interact with the stack-wide /etc/xivo/asterisk/xivo_in_callerid.conf, which also implements normalisation of incoming caller id number according to configurable rules.

This in_callerid normalisation is applied automatically on the caller id of incoming calls, before the call is answered, affecting

reverse lookups(which are performed on the normalised caller id)

called user’s caller id display, if reverse lookup is not applied or is unsuccessful

caller number stored in CDRs

If the in_callerid rules transform incoming caller id numbers to non-E.164 format(e.g. national format or geographic-specific international dialing format with international dialing prefix), then the tenant country must be defined appropriately to provide the needed geographic context in order to correctly interpret those geo-specific phone numbers. Leaving the tenant country to null or setting it to an incorrect country inconsistant with the in_callerid rules(i.e. in_callerid rules normalising numbers for a geographic context but setting the tenant country to a different geographic context) will lead to incorrect behaviors, such as failed(false negative) reverse lookups, failed(false negative) blocklist screenings.