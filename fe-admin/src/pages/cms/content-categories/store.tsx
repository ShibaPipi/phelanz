import { Create, Edit, useForm, useSelect } from '@refinedev/antd';
import { useParsed } from '@refinedev/core';
import { Form, Input, InputNumber, Select, Switch } from 'antd';
import { useMemo } from 'react';

export const CmsContentCategoryStore = () => {
  const { id } = useParsed();
  const { formProps, saveButtonProps } = useForm({});
  const { selectProps: menuSelectProps } = useSelect({
    resource: 'cms_content_categories',
    optionLabel: 'name',
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
        <Form.Item label={'Parent'} name={['parentId']}>
          <Select
            {...menuSelectProps}
            options={menuSelectProps.options?.map((item) => ({
              ...item,
              disabled: +item.value! === +id!,
            }))}
            allowClear
          />
        </Form.Item>
        <Form.Item
          label={'Display Order'}
          name={['displayOrder']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label={'Status'}
          name={['status']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Switch />
        </Form.Item>
      </Form>
    </Wrapper>
  );
};
