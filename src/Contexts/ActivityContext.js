import React from 'react';


export const ActivityContext = React.createContext();

export const ActivityStorage = ({ children }) => {

  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  return (
    <ActivityContext.Provider
      value={{ error, loading }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
