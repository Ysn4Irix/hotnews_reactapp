/**
 * @author YsnIrix
 * @email ysn4irix@gmail.com
 * @create date 03-08-2021
 * @modify date 03-08-2021
 * @desc [description]
 */

import { createContext } from "react";

export const CredentialsContext = createContext({
  storedCredentials: {},
  setStoredCredentials: () => {},
});
