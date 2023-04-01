const api = async (promise) => {
  try {
    const resp = await promise;
    const {status, data} = resp;
    return {status, data};
  } catch (err) {
    const {status, data} = err.response;
    return {status, data};
  }
};

export default api;
