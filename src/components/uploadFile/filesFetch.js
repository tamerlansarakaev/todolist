import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';

/**
 * Uploads a file to the server
 * @param {object} fileUpload
 * @returns {object} File as an object
 */
async function uploadFile(fileUpload) {
  if (!fileUpload) return;
  const currentFile = fileUpload.name;
  const fileRef = ref(storage, `files/${currentFile}`);

  const uploaded = await uploadBytes(fileRef, fileUpload).then((res) => {
    return res.metadata;
  });
  return uploaded;
}

/**
 * Returns a link to a file
 * @param {string} urlFile
 * @returns {fileUrl} file link
 */
async function fetchFile(urlFile) {
  const fileRef = ref(storage, urlFile);
  const getFile = await getDownloadURL(fileRef).then((res) => (urlFile = res));
  return getFile;
}

export { uploadFile, fetchFile };
