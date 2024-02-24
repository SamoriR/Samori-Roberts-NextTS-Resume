import React from 'react';
import classnames from 'classnames';

export const OuterContainer = (props: any) => {
  const { className, style, children } = props;

  return (
    <div className={classnames('sm:px-8', className)} style={style}>
      <div className="mx-auto max-w-7xl lg:px-8">{children}</div>
    </div>
  );
};

export const InnerContainer = (props: any) => {
  const { className, children } = props;

  return (
    <div
      className={classnames('relative px-4 sm:px-8 lg:px-12', className)}
    >
      <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
    </div>
  );
};

const Container = (props: any) => {
  const {
    children,
    innerClassName,
    outerClassName,
    style,
  } = props;

  return (
    <OuterContainer className={outerClassName} style={style}>
      <InnerContainer className={innerClassName}>
        {children}
      </InnerContainer>
    </OuterContainer>
  );
};``

export default Container;
