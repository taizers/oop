import Button from '@mui/material/Button';
import React, { FC } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';

import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

type UploadFileType = {
  files: any;
  setFiles: (data: any) => void;
  maxFiles?: number;
  accepted?: Array<string>;
  isMultiply?: boolean;
};

const UploadFile: FC<UploadFileType> = ({
  files,
  setFiles,
  maxFiles = 5,
  accepted = ['image/*'],
  isMultiply = false,
}) => {
  return (
    <FilePond
      files={files}
      onupdatefiles={setFiles}
      maxFiles={maxFiles}
      allowMultiple={isMultiply}
      acceptedFileTypes={accepted}
      name="files"
      labelIdle='Ператащите изображение либо <span class="filepond--label-action">Откройте</span>'
    />
  );
};

export default UploadFile;
