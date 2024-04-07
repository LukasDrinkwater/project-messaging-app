import { createContext, useState } from "react";

const LoginContext = createContext({});

// destructure the children that are coming in.
// Children reprisents the components that are inside the LoginProvider
export const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(undefined);

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      {/* children here are the components that will be nested inside the loginProvider  */}
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
