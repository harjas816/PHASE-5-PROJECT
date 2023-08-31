import { useState, useContext, createContext, React } from "react";
import { ReactDOM } from "react-dom/client";

const UserContext = createContext(null)

function UserProvider({ children }) {

    const [user, setUser] = useState(null)


    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}



export { UserContext, UserProvider }