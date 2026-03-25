for all endpoints of the provd section, we have the response content-Type: "application/vnd.proformatique.provd+json"
https://api.wazo.io/documentation/api/provisioning.html#tag/configs/paths/~1cfg_mgr~1configs~1%7Bconfig_id%7D/get

So when i use the sdk's apiclient / apiRequester, i got an error:
_BadResponse: You must accept the "application/vnd.proformatique.provd+json" MIME type.

I don't think this content-Type is actual, since the response looks to be common "application/json" and proformatique was the first name of the company, when sylvain was alone and in paris, so before the creation of Xivo ...

It's like 20 years old ??

I always can use Fetch, or overwrite the header of the apiRequester ...
But i'm not sure it still make sense to maintain this content-Type.

solution:

apiClient.client.setFetchOptions({headers: {"Accept" : "application/vnd.proformatique.provd+json"}})
    const res = await apiClient.client.get(`provd/0.2/configure`);