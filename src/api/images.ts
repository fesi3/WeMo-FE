import { PATHS } from '@/constants/apiPath';
import axios from 'axios';
import instance from './axiosInstance';

interface PresignedUrls {
  presignedUrls: string[];
}

interface PresignedUrlsResponse {
  success: boolean;
  message: string;
  data: PresignedUrls;
}

export const getPresignedUrls = async (count: number) => {
  try {
    const response: PresignedUrlsResponse = await instance(
      PATHS.IMAGE.UPLOAD(count),
    );
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

const uploadImage = async (presignedUrl: string, imageFile: File | Blob) => {
  const formData = new FormData();
  formData.append('file', imageFile);

  const response: string = await axios.post(presignedUrl, imageFile, {
    headers: {
      'Content-Type': imageFile.type,
    },
  });
  return response;
};

/**
 *
 * @param {File[]|Blob[]} imageFiles 이미지를 항상 배열로 전달하세요.
 * @returns {string[]} 업로드한 파일의 순서대로 반환받습니다.
 */
export const getImageUrls = async (imageFiles: File[] | Blob[]) => {
  const count = imageFiles.length;
  const response = await getPresignedUrls(count);
  if (!response) return;
  const presignedUrls = response.presignedUrls;
  return Promise.all(
    imageFiles.map(
      async (file, index) => await uploadImage(presignedUrls[index], file),
    ),
  );
};
