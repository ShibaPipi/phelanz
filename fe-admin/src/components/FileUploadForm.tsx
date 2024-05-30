import { Upload, Form, UploadFile, UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { ComponentProps, FC, useEffect, useState } from 'react';
import { useMemoizedFn } from 'ahooks';

interface Props {
  value?: UploadFile[];
  label: ComponentProps<typeof Form.Item>['label'];
  name: ComponentProps<typeof Form.Item>['name'];
  onSuccess: () => void;
}

export const FileUploadForm: FC<Props> = ({
  value = [],
  label,
  name,
  onSuccess,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleChange: UploadProps['onChange'] = useMemoizedFn((info) => {
    let newFileList = [...info.fileList];

    // Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(newFileList);
  });

  useEffect(() => {
    if (fileList?.length === 0 && value?.length > 0) {
      setFileList(
        value.map(
          ({ url }, index) =>
            ({
              uid: `${index}`,
              name: 'image.png',
              status: 'done',
              fileUrl: url,
            }) as UploadFile,
        ),
      );
    }
  }, [fileList, value, setFileList]);

  return (
    <Form.Item label={label} name={name}>
      <Upload.Dragger
        maxCount={1}
        action="/file/upload"
        fileList={fileList}
        onChange={handleChange}
        showUploadList={false}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Upload.Dragger>
    </Form.Item>
  );
};
