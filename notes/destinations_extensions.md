The use of the 'extension' destination is to be able to use any arbitrary asterisk extension, that is directly using any asterisk dialplan directly.
Wazo's conference, group, queue, users, ivrs, etc are implemented on top of asterisk dialplan extensions.
But if those don't fit your needs, you can define custom dialplan extensions using all the power of asterisk(e.g. through a file in /etc/asterisk/extensions_extra.d),
and then use the 'extension' destination type in wazo to use your custom dialplan.

Also, sometimes the behavior of a wazo entity(like a User) will change depending on where that destination is configured.
That is, the dialplan used under the scene for that destination might change depending on context. 
But you can use the destination internal extension(e.g. user extension) to maintain the same behavior(same dialplan) as usual, independently of the context.