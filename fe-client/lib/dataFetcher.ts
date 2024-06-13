import axiosService from './axios';
import { Banner, Introduction } from './models';

export async function fetchBanners() {
  const response = await axiosService.get<Banner[]>('/cms_banners');
  return response.data;
}

export async function fetchIntroductions() {
  const response = await axiosService.get<Introduction[]>('/cms_introductions');
  return response.data;
}
