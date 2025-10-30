import apiClient from './api';

export const uploadService = {
  uploadFile: async (file, tenantId = 1) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post(
      `/upload/?tenant_id=${tenantId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  getUploadProfile: async (uploadJobId, tenantId = 1) => {
    const response = await apiClient.get(
      `/upload/${uploadJobId}?tenant_id=${tenantId}`
    );
    return response.data;
  },

  getUploadList: async (tenantId = 1, skip = 0, limit = 10) => {
    const response = await apiClient.get(
      `/upload/?tenant_id=${tenantId}&skip=${skip}&limit=${limit}`
    );
    return response.data;
  },
};