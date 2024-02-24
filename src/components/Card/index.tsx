import React from 'react';
import classnames from 'classnames';

import CardDate from './CardDate';
import CardDescription from './CardDescription';
import CardLink from './CardLink';
import CardMoreLink from './CardMoreLink';
import CardTitle from './CardTitle';
import CardEyebrow from './CardEyebrow';

export {
  CardDate,
  CardDescription,
  CardLink,
  CardMoreLink,
  CardTitle,
  CardEyebrow,
};

const Card = (props: any) => {
  const { as: Component = 'div', className, children } = props;
  return (
    <Component
      className={classnames(className, 'group relative flex flex-col items-start')}
    >
      {children}
    </Component>
  );
};

export default Card;
