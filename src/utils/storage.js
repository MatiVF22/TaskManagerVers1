import { useState, useEffect } from 'react';

export const getLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const useExcelData = (sheetName, initialData) => {
  const [data, setData] = useState(() => {
    const storedData = getLocalStorage(sheetName);
    return storedData || initialData;
  });

  useEffect(() => {
    setLocalStorage(sheetName, data);
  }, [sheetName, data]);

  const addRow = (row) => {
    setData(prevData => [...prevData, row]);
  };

  const updateRow = (id, updatedRow) => {
    setData(prevData => prevData.map(row => (row.id === id ? { ...row, ...updatedRow } : row)));
  };

  const deleteRow = (id) => {
    setData(prevData => prevData.filter(row => row.id !== id));
  };

  return { data, addRow, updateRow, deleteRow, setData };
};