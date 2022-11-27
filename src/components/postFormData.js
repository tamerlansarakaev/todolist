import { fetchFile, uploadFile } from './uploadFile/filesFetch';

export async function postFormData(fileUpload) {
  const fileInfo = {};
  if (!fileUpload) return;
  const uploadResponse = await uploadFile(fileUpload);
  fileInfo.filePath = uploadResponse.fullPath;
  fileInfo.fileName = uploadResponse.name;

  const fetchFileResponse = await fetchFile(fileInfo.filePath);
  fileInfo.filePath = fetchFileResponse;
  return fileInfo;
}
