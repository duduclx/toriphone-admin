## mattermost
remark about tenants endpoint.
the contact relation is about an user, but this is not a good point, as it will prefered to have a real contact (firstname, name, compagny, phone, email, etc).

if it's a contact (and not a user) i can create a "client" phonebook, add my contact in, do not have it in phonebook sources, and get customer's information for this tenant.
also, it could be an array of contacts.

As it, i don't know if the contact relation in the tenant is usefull.

To implement this, we (you, not i, i mean .... :) ) could had a "contact_phonebook" property, and so don't break the contact relation.

And also, the doc is missing the default_authentication_method property (native by default).

that's all folks !

## adaptation

modify use of properties

tenant.address.state = contact name
tenant.address.line_2 = email

pour bien faire, il faudrait créer le tenant
créer un user dans le tenant qui vient d'être créé
mettre à jour le tenant

dans le user, j'ai
fisrtname
lastname
email
password
et le mettre admin

utiliser users/create uniquement le step 1

But i will do like this:
create the tenant,
create an user in this tenant
edit the tenant to add the created user as contact.

if i create the user in the parent tenant, he will access to the parent tenant, wich i don't want.

the plus to have a contact in the parent tenant is:

    sounds like a customer management to me.the tenant's user can't modify / delete the contact related to this tenanthe can't access the parent tenant.

## tenant error
le nom est obligatoire
