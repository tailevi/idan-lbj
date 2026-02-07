const API_BASE_URL = 'http://localhost:8080';

// Token management
export function getToken() {
  return localStorage.getItem('adminToken');
}

export function setToken(token) {
  localStorage.setItem('adminToken', token);
}

export function clearToken() {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminAuthenticated');
}

// Generic API request wrapper
async function apiRequest(url, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(errorData.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    throw error;
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// Auth API
export const authApi = {
  login: (username, password) =>
    apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  register: (username, email, password, firstName, lastName, phone) =>
    apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password, firstName, lastName, phone }),
    }),

  logout: () =>
    apiRequest('/api/auth/logout', {
      method: 'POST',
    }),
};

// Map backend article response to frontend format
function mapArticleFromBackend(article) {
  return {
    id: article.id,
    title: article.title || '',
    titleHe: article.titleHe || '',
    content: article.content || '',
    contentHe: article.contentHe || '',
    image_url: article.coverImage || '',
    order: article.order || 0,
    published: article.status === 'PUBLISHED',
    slug: article.slug || '',
    summary: article.summary || '',
    tags: article.tags || [],
    featured: article.featured || false,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
  };
}

// Map frontend article data to backend request format
function mapArticleToBackend(articleData) {
  const slug = articleData.slug || (articleData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now());
  return {
    title: articleData.title,
    titleHe: articleData.titleHe || '',
    slug: slug,
    content: articleData.content,
    contentHe: articleData.contentHe || '',
    summary: articleData.content ? articleData.content.substring(0, 150) : '',
    coverImage: articleData.image_url || '',
    order: articleData.order || 0,
    status: articleData.published ? 'PUBLISHED' : 'DRAFT',
    tags: articleData.tags || [],
    featured: articleData.featured || false,
  };
}

// Articles API (admin - requires auth)
export const articlesApi = {
  getAll: async (page = 0, size = 50) => {
    const data = await apiRequest(`/api/articles?page=${page}&size=${size}&sort=order,asc`);
    return {
      articles: (data.content || []).map(mapArticleFromBackend),
      totalPages: data.totalPages || 0,
      totalElements: data.totalElements || 0,
    };
  },

  getById: async (id) => {
    const data = await apiRequest(`/api/articles/${id}`);
    return mapArticleFromBackend(data);
  },

  create: async (articleData) => {
    const data = await apiRequest('/api/articles', {
      method: 'POST',
      body: JSON.stringify(mapArticleToBackend(articleData)),
    });
    return mapArticleFromBackend(data);
  },

  update: async (id, articleData) => {
    const data = await apiRequest(`/api/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(mapArticleToBackend(articleData)),
    });
    return mapArticleFromBackend(data);
  },

  delete: (id) =>
    apiRequest(`/api/articles/${id}`, {
      method: 'DELETE',
    }),
};

// Public Articles API (no auth required)
export const publicArticlesApi = {
  getPublished: async (page = 0, size = 10) => {
    const data = await apiRequest(`/api/public/articles?page=${page}&size=${size}&sort=order,asc`);
    return (data.content || []).map(mapArticleFromBackend);
  },
};
