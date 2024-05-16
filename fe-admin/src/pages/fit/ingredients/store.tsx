import { Create, Edit, useForm, useSelect } from '@refinedev/antd';
import { useParsed } from '@refinedev/core';
import { Form, Input, Select } from 'antd';
import { useMemo } from 'react';

export const FitIngredientStore = () => {
  const { id } = useParsed();
  const { formProps, saveButtonProps } = useForm({});
  const { selectProps: typeSelectProps } = useSelect({
    resource: 'fit_ingredients/types',
  });

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
          label={'Type'}
          name={['type']}
          initialValue={formProps.initialValues?.type}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...typeSelectProps} showSearch={false} />
        </Form.Item>
      </Form>
    </Wrapper>
  );
};
