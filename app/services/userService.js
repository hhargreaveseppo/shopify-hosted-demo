const USER_ID_KEY = 'eppo_user_id';

class UserService {
  constructor() {
    this._userId = null;
    this._queryParams = {};
  }

  getUserId() {
    if (this._userId) return this._userId;

    // Try to get existing ID from localStorage
    const storedId = typeof window !== 'undefined' ? localStorage.getItem(USER_ID_KEY) : null;
    if (storedId) {
      this._userId = storedId;
      return storedId;
    }

    // Generate new ID if none exists
    const newId = `user_${Math.random().toString(36).substr(2, 9)}`;
    this._userId = newId;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_ID_KEY, newId);
    }
    
    return newId;
  }

  setQueryParams(params) {
    this._queryParams = { ...params }; // Create a copy of the params
  }

  getContext() {
    const context = {
      userId: this.getUserId(),
      ...this._queryParams,
    };
    return context;
  }
}

// Create a singleton instance
const userService = new UserService();

export default userService; 