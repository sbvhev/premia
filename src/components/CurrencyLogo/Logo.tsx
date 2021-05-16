import React, { CSSProperties, useState } from 'react';
import { Help } from '@material-ui/icons';

const BAD_SRCS: { [tokenAddress: string]: true } = {};

export interface LogoProps {
  srcs: string[];
  alt: string;
  style?: CSSProperties;
  className?: string;
}

/**
 * Renders an image by sequentially trying a list of URIs, and then eventually a fallback triangle alert
 */
export default function Logo({ srcs, alt, ...rest }: LogoProps) {
  const [, refresh] = useState<number>(0);

  const src: string | undefined = srcs.find((src) => !BAD_SRCS[src]);

  if (src) {
    return (
      <img
        {...rest}
        alt={alt}
        src={src}
        onError={() => {
          if (src) BAD_SRCS[src] = true;
          refresh((i) => i + 1);
        }}
      />
    );
  }

  return <Help {...rest} />;
}
