import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from '@refinedev/antd';
import { BaseRecord, useResource } from '@refinedev/core';
import { Image, Space, Table } from 'antd';
import { TagStatusBoolean } from 'components';

export const CmsBannerList = () => {
  const { resource } = useResource();
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={'ID'} />
        <Table.Column
          title={'Image'}
          render={(_, { image_src }: BaseRecord) => (
            <Image src={image_src} height={96} />
          )}
        />
        <Table.Column
          title={'Status'}
          render={(_, { status }: BaseRecord) => (
            <TagStatusBoolean status={status} />
          )}
        />
        <Table.Column dataIndex="createdAt" title={'Created At'} />
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
