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
   * Recieves a Webhook, validates it and sends it to Issues Create Controller.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  index (req, res, next) {
    req.body = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      webhookURL: req.body.webhookURL,
      webhookSecretToken: req.body.webhookSecretToken
    }

    next()
  }
}
