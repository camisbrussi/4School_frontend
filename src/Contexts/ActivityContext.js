import React from 'react';


export const ActivityContext = React.createContext();

export const ActivityStorage = ({ children }) => {

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);


  return (
    <ActivityContext.Provider
      value={{ error, loading }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
