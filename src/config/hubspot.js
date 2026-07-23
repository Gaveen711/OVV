/**
 * HubSpot Configuration
 * Replace portalId and formGuid with your actual HubSpot credentials.
 * Learn more: https://legacydocs.hubspot.com/docs/methods/forms/submit_form
 */
export const HUBSPOT_CONFIG = {
  // Your HubSpot Hub ID / Portal ID (e.g., '12345678')
  portalId: '44812390', 
  
  // Your HubSpot Form GUID (e.g., 'a1b2c3d4-e5f6-7890-abcd-ef1234567890')
  formGuid: '8d7e6f5a-4b3c-2d1e-0f9a-8b7c6d5e4f3a',
  
  // Set to true to test submissions even before attaching live HubSpot keys
  demoModeIfUnconfigured: true,
};
