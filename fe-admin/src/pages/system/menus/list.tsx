import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from '@refinedev/antd';
import { BaseRecord, useResource } from '@refinedev/core';
import { Space, Table } from 'antd';
import { useMemo } from 'react';

interface Data {
  id: number;
  parentId: number;
  children?: Data[];
}

const list2Tree = (data: Data[]) => {
  const map: { [key: number]: Data } = {};
  const result: Data[] = [];

  data.forEach((item) => {
    map[item.id] = item;
  });

  data.forEach((item) => {
    const { id, parentId } = item;
    const node = map[id];
    const parent = map[parentId];
    console.log('1 => ', 1);
    if (parent) {
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(node);
    } else {
      result.push(node);
    }
  });

  return result;
};

export const SystemMenuList = () => {
  const { resource } = useResource();
  const { tableProps } = useTable<Data>({
    syncWithLocation: true,
  });

  const dataSource = useMemo(() => {
    if (!tableProps.dataSource) return [];
    return list2Tree([...tableProps.dataSource]);
  }, [tableProps.dataSource]);

  return (
    <List>
      <Table {...tableProps} dataSource={dataSource} rowKey="id">
        <Table.Column dataIndex="id" title={'ID'} />
        <Table.Column dataIndex="name" title={'Name'} />
        <Table.Column dataIndex="displayOrder" title={'Display Order'} />
        <Table.Column dataIndex="type" title={'Type'} />
        <Table.Column dataIndex="status" title={'Status'} />
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
