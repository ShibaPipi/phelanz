import { Create, Edit, useForm, useSelect } from '@refinedev/antd';
import { useParsed } from '@refinedev/core';
import { Form, Input, InputNumber, Radio, Select } from 'antd';
import { useMemo } from 'react';

export const SystemMenuStore = () => {
  const { id } = useParsed();
  const { formProps, saveButtonProps } = useForm({});
  const { selectProps: menuSelectProps } = useSelect({
    resource: 'system_menus',
    optionLabel: 'name',
  });
  const { selectProps: typeSelectProps } = useSelect({
    resource: 'system_menus/types',
  });
  const { selectProps: statusesSelectProps } = useSelect({
    resource: 'system_menus/statuses',
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
        <Form.Item label={'Path'} name={['path']}>
          <Input />
        </Form.Item>
        <Form.Item label={'Route'} name={['route']}>
          <Input />
        </Form.Item>
        <Form.Item label={'Query String'} name={['queryString']}>
          <Input />
        </Form.Item>
        <Form.Item
          label={'Outer Link'}
          name={['isOuterLink']}
          initialValue={false}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Radio.Group
            options={[
              { label: 'Yes', value: true },
              { label: 'No', value: false },
            ]}
          />
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
        <Form.Item
          label={'Visible'}
          name={['visible']}
          initialValue={false}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Radio.Group
            options={[
              { label: 'Yes', value: true },
              { label: 'No', value: false },
            ]}
          />
        </Form.Item>
        <Form.Item
          label={'Status'}
          name={['status']}
          initialValue={formProps.initialValues?.status}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...statusesSelectProps} showSearch={false} />
        </Form.Item>
        <Form.Item label={'Permission Tag'} name={['permissionTag']}>
          <Input />
        </Form.Item>
        <Form.Item label={'Icon'} name={['icon']}>
          <Input />
        </Form.Item>
      </Form>
    </Wrapper>
  );
};
