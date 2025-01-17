import axios, { AxiosError } from 'axios';
import axiosInstance from '@/api/axiosInstance';
import { CroppedImageType } from '@/types/cropperType';

export const getPresignedUrls = async (count: number): Promise<string[]> => {
  try {
    const response = await axiosInstance.get(`/api/images?count=${count}`);
    return response.data.data.presignedUrl;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      'Presigned URL 요청 실패:',
      axiosError.response?.data || axiosError.message,
    );
    throw new Error('Presigned URL 요청 중 오류 발생');
  }
};

export const uploadImagesToS3 = async (
  files: CroppedImageType[],
  urls: string[],
) => {
  const uploadPromises = files.map((file, index) =>
    axios.put(urls[index], file.blobImg, {
      headers: {
        'Content-Type': 'image/jpeg',
      },
    }),
  );
  await Promise.all(uploadPromises);
};
