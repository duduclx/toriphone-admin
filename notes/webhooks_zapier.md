## alan on mattermost

Yea. I only fire on a handful of things. Turns out, Zapier does not support static webhook urls anymore. So you have to build a system that records the subscribe and unsubscribe url that Zapier sends you

In your own api, something like this

Routes
```js
router.get('/webhook/list', zapierController.dummyList)
router.post('/webhook/subscribe', zapierController.createZapierWebhook)
router.delete('/webhook/unsubscribe', zapierController.deleteZapierWebhook)
```

Controller
```js
module.exports.createZapierWebhook = async (req, res) => {
  logger.info(`Creating Zapier webhook for tenant ${req.params.tenantUuid}`)

  const { hookUrl, type, userUuid } = req.body

  logger.info(
    `Creating Zapier webhook for tenant ${req.params.tenantUuid} with hookUrl ${hookUrl} and type ${type}`
  )

  const isSubscribed = await zapierService.subscribeToWebhook(
    req.params.tenantUuid,
    type,
    hookUrl,
    userUuid
  )

  if (!isSubscribed) {
    return res.status(500).json({ message: 'Failed to subscribe to webhook' })
  }

  return res.status(200).json({ message: 'Webhook created' })
}
```

THEN in your listener, you can fire off to zaiper

I use Google Firestore to store tenant info
```js
// ** Zapier Integration **
  if (customerData.zapierIntegration) {
    if (!customerData.zapierIntegration.isEnabled) return

    zapierService.fireZapierWebhook(customerData.zapierIntegration.webhooks.onCallCreated, {
      tenantUuid,
      ...data.data
    })
  }
  ```

  Small snippet of my zapier service
  ```js
  /**
 * Fires a Zapier webhook with the provided URL and data.
 *
 * @param {string} url - The URL to fire the Zapier webhook to.
 * @param {object} data - The data to send in the Zapier webhook.
 * @returns {Promise<boolean>} - A promise that resolves to true if the webhook is fired successfully, false otherwise.
 */
module.exports.fireZapierWebhook = async (url, data) => {
  try {
    if (!url) {
      logger.error(`No URL provided for Zapier webhook`)

      return false
    }

    axios
      .post(url, data)
      .then(res => {
        logger.info(`Zapier webhook fired successfully: ${url}`)

        return true
      })
      .catch(err => {
        logger.error(`Error firing Zapier webhook: ${err.message}`)

        return false
      })
  } catch (error) {
    logger.error(`Error firing Zapier webhook: ${error.message}`)

    return false
  }
}
  ```

  https://community.zapier.com/general-discussion-13/how-to-send-data-to-static-webhook-url-14856