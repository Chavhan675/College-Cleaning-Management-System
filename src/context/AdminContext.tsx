import React, { createContext, useContext, useState, useEffect } from "react";

interface AdminContextType {
  isAdmin: boolean;
  adminName: string;
  toggleAdmin: () => void;
  setAdminStatus: (status: boolean) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("gcoeara_clean_is_admin");
      return saved === "true";
    } catch {
      return true; // Default to admin enabled so user has instant access
    }
  });

  const adminName = "आकाश चव्हाण (Akash Chavhan) - Head Incharge";

  const toggleAdmin = () => {
    setIsAdmin((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("gcoeara_clean_is_admin", String(next));
      } catch {}
      return next;
    });
  };

  const setAdminStatus = (status: boolean) => {
    setIsAdmin(status);
    try {
      localStorage.setItem("gcoeara_clean_is_admin", String(status));
    } catch {}
  };

  return (
    <AdminContext.Provider value={{ isAdmin, adminName, toggleAdmin, setAdminStatus }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    return {
      isAdmin: true,
      adminName: "Akash Chavhan (Admin)",
      toggleAdmin: () => {},
      setAdminStatus: () => {},
    };
  }
  return context;
};
