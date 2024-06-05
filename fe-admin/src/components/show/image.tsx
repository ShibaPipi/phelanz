import { ComponentProps, FC } from 'react';
import { Image, Typography } from 'antd';

interface Props extends ComponentProps<typeof Image> {
  value?: string;
}

export const ShowImage: FC<Props> = (props) => {
  return (
    <>
      <Typography.Title level={5}>{'Image'}</Typography.Title>
      <Image {...props} />
    </>
  );
};
