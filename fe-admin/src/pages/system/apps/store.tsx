import { Create, Edit, useForm } from '@refinedev/antd';
import { useParsed } from '@refinedev/core';
import { Form, Input } from 'antd';
import { useMemo } from 'react';

export const SystemAppStore = () => {
  const { id } = useParsed();
  const { formProps, saveButtonProps } = useForm({});

  const Wrapper = useMemo(() => (id ? Edit : Create), [id]);

  return (
    <Wrapper saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={'Name'}
          name={['name']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={'Description'}
          name={['description']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Wrapper>
  );
};
