// apiUtils.js
export function withErrorHandling(apiFunction) {
    return async (...args) => {
      try {
        const response = await apiFunction(...args);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`API request failed with status: ${response.status}`);
        }
      } catch (error) {
        throw new Error(`API request error: ${error.message}`);
      }
    };
  }
  