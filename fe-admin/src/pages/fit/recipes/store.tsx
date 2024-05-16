import { Create, Edit, useForm, useSelect } from '@refinedev/antd';
import { useParsed } from '@refinedev/core';
import { Form, Input, Select } from 'antd';
import { useMemo } from 'react';

export const FitRecipeStore = () => {
  const { id } = useParsed();
  const { formProps, saveButtonProps } = useForm({});
  const { selectProps: typeSelectProps } = useSelect({
    resource: 'fit_recipes/types',
  });
  const { selectProps: ingredientSelectProps } = useSelect({
    resource: 'fit_ingredients',
    optionLabel: 'name',
    debounce: 300,
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
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...typeSelectProps} showSearch={false} />
        </Form.Item>
        <Form.Item
          label={'Ingredients'}
          name={id ? ['ingredientIds'] : ['relations', 'ingredients']}
          initialValue={formProps.initialValues?.ingredients.map(
            ({ id }: { id: number }) => id,
          )}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...ingredientSelectProps} mode="multiple" />
        </Form.Item>
      </Form>
    </Wrapper>
  );
};
