import { PATHS } from '@/constants/apiPath';
import axios from 'axios';
import instance from './axiosInstance';

interface PresignedUrl {
  presignedUrl: string[];
}

interface PresignedUrlsResponse {
  success: boolean;
  message: string;
  data: PresignedUrl;
}

export const getPresignedUrls = async (count: number) => {
  try {
    const response = await instance.get(PATHS.IMAGE.UPLOAD(count));
    const data: PresignedUrlsResponse = response.data;
    return data;
  } catch (e) {
    console.error(e);
  }
};

const uploadImage = async (presignedUrl: string, imageFile: File | Blob) => {
  const formData = new FormData();
  formData.append('file', imageFile);
  const response: string = await axios.put(presignedUrl, imageFile, {
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
  const presignedUrl = response?.data.presignedUrl;
  if (!presignedUrl) return;
  const result = await Promise.all(
    imageFiles.map(async (file, index) => {
      try {
        return await uploadImage(presignedUrl[index], file);
      } catch (e) {
        console.error(e, '이미지 업로드 실패');
      }
    }),
  );

  if (result.includes(undefined)) {
    return undefined;
  }
  return presignedUrl;
};
