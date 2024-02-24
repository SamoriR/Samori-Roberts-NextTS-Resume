import React from 'react';
import { EnvelopeIcon } from '@heroicons/react/20/solid';

import SocialLink from './SocialLink';
import urls from './urls';

const EmailLink = ({ showLabel }: { showLabel?: boolean }) => {
  const label = 'samori.roberts@gmail.com';
  return (
    <SocialLink
      to={urls.email}
      icon={<EnvelopeIcon />}
      aria-label={`Send email to ${label}`}
    >
      { showLabel ? label : undefined }
    </SocialLink>
  );
};

export default EmailLink;
