import React from 'react';
import { Frame } from 'framer';

export function KeyboardInfo(props) {
  const { ...rest } = props;

  return (
    <Frame
      width="auto"
      height="auto"
      background={'none'}
      bottom={-32}
      left={0}
      style={{
        color: '#fff',
        fontSize: 12,
      }}>
      <strong>Directional:</strong> arrow keys. <strong>Select:</strong>{' '}
      return/space. <strong>Back:</strong> delete/escape.
    </Frame>
  );
}
