/**
 * Module for the HookController.
 *
 * @author Fredrik Jurgell
 * @version 1.0.0
 */

/**
 * Encapsulates a controller.
 */
export class HookController {
  /**
   * Registers a webhook and sends it to User Create Controller.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  registerWebhook (req, res, next) {
    req.body = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      webhookURL: req.body.webhookURL,
      webhookSecretToken: req.body.webhookSecretToken
    }

    // HATEOAS response
    res.status(201).json({
      message: 'Webhook registered successfully',
      links: {
        self: {
          href: `${req.protocol}://${req.get('host')}/api/v1/webhook`,
          method: 'POST',
          type: 'application/json'
        }
      }
    })

    next()
  }
}
