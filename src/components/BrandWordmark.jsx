import { Fragment } from 'react';

const BRAND_WORDS = ['Ocean', 'View', 'Villas'];

/**
 * "Ocean View Villas" with the leading O / V / V picked out so the OVV
 * monogram reads inside the full name.
 *
 * Natural casing is deliberate: an uppercase transform flattens the initials
 * into the rest of each word and the monogram stops registering. Callers that
 * style this must not apply `uppercase`.
 */
export default function BrandWordmark({ accentClassName = '' }) {
  return BRAND_WORDS.map((word, i) => (
    <Fragment key={word}>
      <span className={accentClassName}>{word[0]}</span>
      {word.slice(1)}
      {i < BRAND_WORDS.length - 1 ? ' ' : null}
    </Fragment>
  ));
}
