import { createContext, useState, useEffect } from "react";

export const EmployeeContext = createContext();

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState(
    JSON.parse(localStorage.getItem("employees")) || []
  );

  const addEmployee = (employee) => {
    setEmployees((prev) => [...prev, employee]);
  };

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees, addEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
}
