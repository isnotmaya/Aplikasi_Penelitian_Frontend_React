const endpoints = {
  penelitian: {
    getAll: '/api/penelitian',
    getById: (kd_penelitian) => `/api/penelitian/${kd_penelitian}`,
    create: '/api/penelitian/insert',
    update: (kd_penelitian) => `/api/penelitian/update/${kd_penelitian}`,
    delete: (kd_penelitian) => `/api/penelitian/delete/${kd_penelitian}`,
  },
  pengabdian: {
    getAll: '/api/pengabdian',
    getById: (kd_pengabdian) => `/api/pengabdian/${kd_pengabdian}`,
    create: '/api/pengabdian/insert',
    update: (kd_pengabdian) => `/api/pengabdian/update/${kd_pengabdian}`,
    delete: (kd_pengabdian) => `/api/pengabdian/delete/${kd_pengabdian}`,
  },

};

export default endpoints;
