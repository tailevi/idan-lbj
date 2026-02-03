import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Mock customers data
const mockCustomers = [
  {
    id: '1',
    email: 'test',
    password: 'test',
    firstName: 'Test',
    lastName: 'User',
    phone: '050-123-4567',
    address: '123 Test Street, Tel Aviv',
    createdAt: '2024-01-01T00:00:00Z',
    creditCards: [
      {
        id: 'cc1',
        lastFour: '4242',
        brand: 'Visa',
        expiryMonth: '12',
        expiryYear: '2026',
        isDefault: true
      }
    ]
  },
  {
    id: '2',
    email: 'sarah@example.com',
    password: 'sarah123',
    firstName: 'Sarah',
    lastName: 'Cohen',
    phone: '052-987-6543',
    address: '45 Rothschild Blvd, Tel Aviv',
    createdAt: '2024-02-15T00:00:00Z',
    creditCards: []
  }
];

// Mock orders for customers
const mockCustomerOrders = [
  {
    id: 'ORD-1001',
    customerId: '1',
    items: [
      { productId: '1', title: 'A Gentle Touch of Serenity', size: '50×70 ס"מ', quantity: 1, price: 5175, image: '/products/A_Gentle_Touch_of_Serenity_.webp' }
    ],
    status: 'delivered',
    total: 5175,
    shippingAddress: '123 Test Street, Tel Aviv',
    createdAt: '2024-01-10T10:30:00Z',
    deliveredAt: '2024-01-18T14:00:00Z'
  },
  {
    id: 'ORD-1002',
    customerId: '1',
    items: [
      { productId: '3', title: 'A Moment of Gentle Grace', size: '70×100 ס"מ', quantity: 1, price: 4380, image: '/products/A_Moment_of_Gentle_Grace_.webp' },
      { productId: '5', title: 'A Stride Toward Discovery', size: '30×40 ס"מ', quantity: 2, price: 8460, image: '/products/A_Stride_Toward_Discovery_.webp' }
    ],
    status: 'shipped',
    total: 12840,
    shippingAddress: '123 Test Street, Tel Aviv',
    createdAt: '2024-01-25T16:45:00Z',
    shippedAt: '2024-01-28T09:00:00Z'
  },
  {
    id: 'ORD-1003',
    customerId: '1',
    items: [
      { productId: '6', title: 'A Whimsical Shift of Perspective', size: '100×150 ס"מ', quantity: 1, price: 26820, image: '/products/A_Whimsical_Shift_of_Perspective.webp' }
    ],
    status: 'processing',
    total: 26820,
    shippingAddress: '123 Test Street, Tel Aviv',
    createdAt: '2024-02-01T11:20:00Z'
  },
  {
    id: 'ORD-1004',
    customerId: '1',
    items: [
      { productId: '8', title: 'Aspiring to the Peak', size: '50×70 ס"מ', quantity: 1, price: 10170, image: '/products/Aspiring_to_the_Peak_.webp' }
    ],
    status: 'pending',
    total: 10170,
    shippingAddress: '123 Test Street, Tel Aviv',
    createdAt: '2024-02-03T08:15:00Z'
  }
];

export function AuthProvider({ children }) {
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedCustomer = sessionStorage.getItem('customerData');
    if (savedCustomer) {
      setCustomer(JSON.parse(savedCustomer));
    }
    setIsLoading(false);
  }, []);

  const getCustomers = () => {
    const saved = localStorage.getItem('customers');
    return saved ? JSON.parse(saved) : mockCustomers;
  };

  const saveCustomers = (customers) => {
    localStorage.setItem('customers', JSON.stringify(customers));
  };

  const login = (email, password) => {
    const customers = getCustomers();
    const found = customers.find(c => c.email === email && c.password === password);

    if (found) {
      const { password: _, ...customerData } = found;
      setCustomer(customerData);
      sessionStorage.setItem('customerData', JSON.stringify(customerData));
      sessionStorage.setItem('customerAuthenticated', 'true');
      return { success: true, customer: customerData };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const register = (userData) => {
    const customers = getCustomers();

    // Check if email already exists
    if (customers.find(c => c.email === userData.email)) {
      return { success: false, error: 'Email already exists' };
    }

    const newCustomer = {
      id: Date.now().toString(),
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      address: '',
      createdAt: new Date().toISOString(),
      creditCards: []
    };

    const updatedCustomers = [...customers, newCustomer];
    saveCustomers(updatedCustomers);

    const { password: _, ...customerData } = newCustomer;
    setCustomer(customerData);
    sessionStorage.setItem('customerData', JSON.stringify(customerData));
    sessionStorage.setItem('customerAuthenticated', 'true');

    return { success: true, customer: customerData };
  };

  const logout = () => {
    setCustomer(null);
    sessionStorage.removeItem('customerData');
    sessionStorage.removeItem('customerAuthenticated');
  };

  const updateProfile = (updates) => {
    const customers = getCustomers();
    const index = customers.findIndex(c => c.id === customer.id);

    if (index !== -1) {
      customers[index] = { ...customers[index], ...updates };
      saveCustomers(customers);

      const { password: _, ...customerData } = customers[index];
      setCustomer(customerData);
      sessionStorage.setItem('customerData', JSON.stringify(customerData));
      return { success: true };
    }
    return { success: false, error: 'Customer not found' };
  };

  const changePassword = (currentPassword, newPassword) => {
    const customers = getCustomers();
    const index = customers.findIndex(c => c.id === customer.id);

    if (index !== -1) {
      if (customers[index].password !== currentPassword) {
        return { success: false, error: 'Current password is incorrect' };
      }

      customers[index].password = newPassword;
      saveCustomers(customers);
      return { success: true };
    }
    return { success: false, error: 'Customer not found' };
  };

  const addCreditCard = (cardData) => {
    const customers = getCustomers();
    const index = customers.findIndex(c => c.id === customer.id);

    if (index !== -1) {
      const newCard = {
        id: Date.now().toString(),
        lastFour: cardData.cardNumber.slice(-4),
        brand: detectCardBrand(cardData.cardNumber),
        expiryMonth: cardData.expiryMonth,
        expiryYear: cardData.expiryYear,
        isDefault: customers[index].creditCards.length === 0
      };

      customers[index].creditCards.push(newCard);
      saveCustomers(customers);

      const { password: _, ...customerData } = customers[index];
      setCustomer(customerData);
      sessionStorage.setItem('customerData', JSON.stringify(customerData));
      return { success: true, card: newCard };
    }
    return { success: false, error: 'Customer not found' };
  };

  const removeCreditCard = (cardId) => {
    const customers = getCustomers();
    const index = customers.findIndex(c => c.id === customer.id);

    if (index !== -1) {
      customers[index].creditCards = customers[index].creditCards.filter(c => c.id !== cardId);

      // If we removed the default card, make another one default
      if (customers[index].creditCards.length > 0 && !customers[index].creditCards.some(c => c.isDefault)) {
        customers[index].creditCards[0].isDefault = true;
      }

      saveCustomers(customers);

      const { password: _, ...customerData } = customers[index];
      setCustomer(customerData);
      sessionStorage.setItem('customerData', JSON.stringify(customerData));
      return { success: true };
    }
    return { success: false, error: 'Customer not found' };
  };

  const setDefaultCard = (cardId) => {
    const customers = getCustomers();
    const index = customers.findIndex(c => c.id === customer.id);

    if (index !== -1) {
      customers[index].creditCards = customers[index].creditCards.map(c => ({
        ...c,
        isDefault: c.id === cardId
      }));

      saveCustomers(customers);

      const { password: _, ...customerData } = customers[index];
      setCustomer(customerData);
      sessionStorage.setItem('customerData', JSON.stringify(customerData));
      return { success: true };
    }
    return { success: false, error: 'Customer not found' };
  };

  const getOrders = () => {
    if (!customer) return [];
    const savedOrders = localStorage.getItem('customerOrders');
    const orders = savedOrders ? JSON.parse(savedOrders) : mockCustomerOrders;
    return orders.filter(o => o.customerId === customer.id);
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
