/**
 * HubSpot Configuration
 * Replace portalId and formGuid with your actual HubSpot credentials.
 * Learn more: https://legacydocs.hubspot.com/docs/methods/forms/submit_form
 *
 * The "Register your interest" section (src/components/RegisterInterest.jsx)
 * submits to the HubSpot Forms API v3. The HubSpot form referenced by
 * formGuid must contain these fields, or submissions will be rejected:
 *   - firstname
 *   - lastname
 *   - email
 *   - phone
 *   - country
 *   - how_did_you_hear_about_us  (custom contact property)
 *   - message
 * The "sign up for updates" choice is appended to the message body, and the
 * Privacy Policy agreement is sent via legalConsentOptions.
 */
export const HUBSPOT_CONFIG = {
  // Your HubSpot Hub ID / Portal ID (e.g., '12345678')
  portalId: '44812390',

  // Your HubSpot Form GUID (e.g., 'a1b2c3d4-e5f6-7890-abcd-ef1234567890')
  formGuid: '8d7e6f5a-4b3c-2d1e-0f9a-8b7c6d5e4f3a',

  // While true, failed/unconfigured submissions still show a success state so
  // the site can be tested before live HubSpot keys are attached.
  // Set to false in production so real errors are shown to visitors.
  demoModeIfUnconfigured: true,
};
