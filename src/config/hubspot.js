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
  portalId: '246838185',

  // Your HubSpot Form GUID (e.g., 'a1b2c3d4-e5f6-7890-abcd-ef1234567890')
  formGuid: '7179d12b-5093-4ef1-b8dc-82d173e36d65',

  // While true, failed/unconfigured submissions still show a success state so
  // the site can be tested before live HubSpot keys are attached.
  // Set to false in production so real errors are shown to visitors.
  demoModeIfUnconfigured: false,
};
