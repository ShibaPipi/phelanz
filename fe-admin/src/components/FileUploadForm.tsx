import { Upload, Form, UploadFile, UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { ComponentProps, FC, useEffect, useState } from 'react';
import { useMemoizedFn } from 'ahooks';
import { UploadChangeParam } from 'antd/es/upload';
import { UploadFileResponse } from 'models';

type UploadFileWithResponse = UploadFile<UploadFileResponse>;

interface Props {
  initialValues?: string[];
  required?: boolean;
  label: ComponentProps<typeof Form.Item>['label'];
  name: ComponentProps<typeof Form.Item>['name'];
  onSuccess: (info: UploadChangeParam<UploadFileWithResponse>) => void;
  onRemove: (file: UploadFileWithResponse) => void;
}

export const FileUploadForm: FC<Props> = ({
  initialValues,
  required = true,
  label,
  name,
  onSuccess,
  onRemove,
}) => {
  const [initialized, setInitialized] = useState(false);
  const [fileList, setFileList] = useState<UploadFile<UploadFileResponse>[]>(
    [],
  );
  const handleChange: UploadProps['onChange'] = useMemoizedFn(
    (info: UploadChangeParam<UploadFileWithResponse>) => {
      console.log('info => ', info);
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

      onSuccess(info);
    },
  );

  useEffect(() => {
    if (!initialValues) return;
    if (!initialized && fileList.length === 0 && initialValues?.length > 0) {
      setInitialized(true);
      setFileList(
        initialValues.map(
          (src, index) =>
            ({
              uid: `${index}`,
              name: 'image.png',
              status: 'done',
              url: src,
            }) as UploadFile,
        ),
      );
    }
  }, [fileList.length, initialValues, initialized]);

  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        {
          required,
        },
      ]}
    >
      <Upload.Dragger
        maxCount={1}
        action={`${import.meta.env.VITE_DATA_PROVIDER_URL}/file/upload`}
        fileList={fileList}
        onChange={handleChange}
        listType="picture-card"
        onRemove={(file) => {
          setFileList([]);
          onRemove(file);
        }}
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
