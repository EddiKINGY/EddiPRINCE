/**
 * AUTHORITATIVE CONTACT & ADDRESS CONFIGURATION
 * 
 * Verified electronic contact channels:
 * - Email: davidabbahinnocent@gmail.com
 * - X: https://x.com/3dd1pr1nc3 (@3dd1pr1nc3)
 * - LinkedIn: https://www.linkedin.com/in/david-innocent-443465215
 * - GitHub: https://github.com/eddiprince
 * 
 * PHYSICAL MAILING & REGISTERED OFFICE POLICY:
 * A "real contact address" normally means a legitimate physical/business mailing address.
 * No physical mailing, office, city, country, or postal address has been supplied.
 * Under strict zero-fabrication rules, NO street address, office, city, country,
 * postal address, or registered company address is invented or displayed.
 * 
 * If a physical address is required by a future legal or commercial integration,
 * configure it via PHYSICAL_CONTACT_ADDRESS_REQUIRED below.
 */
export const PHYSICAL_CONTACT_ADDRESS_REQUIRED: string | null = null;

export const AUTHORITATIVE_CONTACT = {
  email: 'davidabbahinnocent@gmail.com',
  x: {
    handle: '@3dd1pr1nc3',
    url: 'https://x.com/3dd1pr1nc3',
  },
  linkedin: {
    url: 'https://www.linkedin.com/in/david-innocent-443465215',
  },
  github: {
    url: 'https://github.com/eddiprince',
  },
  physicalAddress: PHYSICAL_CONTACT_ADDRESS_REQUIRED,
} as const;
