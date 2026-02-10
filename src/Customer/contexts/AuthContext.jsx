import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi, setToken, clearToken } from '../../services/api';
import {
  getCustomerData as getCookie,
  setCustomerData as setCookie,
  clearCustomerData,
  setCustomerAuth,
  clearCustomerAuth
} from '../../utils/cookies';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session from cookie
    const savedCustomer = getCookie();
    if (savedCustomer) {
      setCustomer(savedCustomer);
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authApi.login(email, password);
      setToken(response.token);
      setCustomerAuth(true);

      const customerData = {
        id: response.username,
        email: response.email || email,
        firstName: response.firstName || '',
        lastName: response.lastName || '',
        phone: response.phone || '',
      };
      setCustomer(customerData);
      setCookie(customerData);
      return { success: true, customer: customerData, role: response.role };
    } catch (err) {
      return { success: false, error: err.message || 'Invalid credentials' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authApi.register(
        userData.email,
        userData.email,
        userData.password,
        userData.firstName,
        userData.lastName,
        userData.phone,
        userData.recaptchaToken
      );
      setToken(response.token);
      setCustomerAuth(true);

      const customerData = {
        id: response.username,
        email: response.email || userData.email,
        firstName: response.firstName || userData.firstName,
        lastName: response.lastName || userData.lastName,
        phone: response.phone || userData.phone,
      };
      setCustomer(customerData);
      setCookie(customerData);
      return { success: true, customer: customerData };
    } catch (err) {
      return { success: false, error: err.message || 'Registration failed' };
    }
  };

  const logout = () => {
    setCustomer(null);
    clearToken();
    clearCustomerData();
    clearCustomerAuth();
  };

  const updateProfile = (updates) => {
    if (!customer) return { success: false, error: 'Not logged in' };
    const updatedCustomer = { ...customer, ...updates };
    setCustomer(updatedCustomer);
    setCookie(updatedCustomer);
    return { success: true };
  };

  const changePassword = () => {
    // Password changes require backend endpoint - placeholder for now
    return { success: false, error: 'Not implemented yet' };
  };

  const addCreditCard = (cardData) => {
    if (!customer) return { success: false, error: 'Not logged in' };
    const cards = customer.creditCards || [];
    const newCard = {
      id: Date.now().toString(),
      lastFour: cardData.cardNumber.slice(-4),
      brand: detectCardBrand(cardData.cardNumber),
      expiryMonth: cardData.expiryMonth,
      expiryYear: cardData.expiryYear,
      isDefault: cards.length === 0
    };
    const updatedCustomer = { ...customer, creditCards: [...cards, newCard] };
    setCustomer(updatedCustomer);
    setCookie(updatedCustomer);
    return { success: true, card: newCard };
  };

  const removeCreditCard = (cardId) => {
    if (!customer) return { success: false, error: 'Not logged in' };
    let cards = (customer.creditCards || []).filter(c => c.id !== cardId);
    if (cards.length > 0 && !cards.some(c => c.isDefault)) {
      cards[0].isDefault = true;
    }
    const updatedCustomer = { ...customer, creditCards: cards };
    setCustomer(updatedCustomer);
    setCookie(updatedCustomer);
    return { success: true };
  };

  const setDefaultCard = (cardId) => {
    if (!customer) return { success: false, error: 'Not logged in' };
    const cards = (customer.creditCards || []).map(c => ({
      ...c,
      isDefault: c.id === cardId
    }));
    const updatedCustomer = { ...customer, creditCards: cards };
    setCustomer(updatedCustomer);
    setCookie(updatedCustomer);
    return { success: true };
  };

  const getOrders = () => {
    // Orders require backend endpoint - return empty for now
    return [];
  };

  const detectCardBrand = (number) => {
    const cleaned = number.replace(/\s/g, '');
    if (/^4/.test(cleaned)) return 'Visa';
    if (/^5[1-5]/.test(cleaned)) return 'Mastercard';
    if (/^3[47]/.test(cleaned)) return 'Amex';
    return 'Card';
  };

  return (
    <AuthContext.Provider value={{
      customer,
      isLoading,
      isAuthenticated: !!customer,
      login,
      register,
      logout,
      updateProfile,
      changePassword,
      addCreditCard,
      removeCreditCard,
      setDefaultCard,
      getOrders
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
