import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  MarkdownField,
  ShowButton,
  useTable,
} from '@refinedev/antd';
import { BaseRecord, useResource } from '@refinedev/core';
import { Image, Space, Table } from 'antd';

export const CmsAboutList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const { resource } = useResource();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={'ID'} />
        <Table.Column dataIndex="title" title={'Title'} />
        <Table.Column
          title={'Image'}
          render={(_, { image_src }: BaseRecord) =>
            image_src ? <Image src={image_src} height={96} /> : '-'
          }
        />
        <Table.Column
          dataIndex="content"
          title={'Content'}
          render={(value: string) => {
            if (!value) return '-';
            return <MarkdownField value={value.slice(0, 80) + '...'} />;
          }}
        />
        <Table.Column dataIndex="type" title={'Type'} />
        <Table.Column dataIndex="status" title={'Status'} />
        <Table.Column
          dataIndex={['createdAt']}
          title={'Created at'}
          render={(value: string) => <DateField value={value} />}
        />
        <Table.Column
          title={'Actions'}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              {resource?.meta?.canDelete && (
                <DeleteButton hideText size="small" recordItemId={record.id} />
              )}
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
