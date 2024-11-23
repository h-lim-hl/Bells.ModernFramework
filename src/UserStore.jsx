import {atom, useAtom} from "jotai";

const jwtAtom = atom(null);

export function useJwt() {
  const [jwt, setjwtAtom] = useAtom(jwtAtom);

  const setJwt = (newJwt) => {
    localStorage.setItem("jwt", newJwt);
    setjwtAtom(newJwt);
  };

  const getJwt = () => {
    const storedJwt = localStorage.getItem('jwt');
    if(storedJwt && !jwt) {
      setjwtAtom(storedJwt);
    }
    return jwt || storedJwt;
  };

  const clearJwt = () => {
    localStorage.removeItem('jwt');
    setjwtAtom(null);
  };

  return {jwt, setJwt, getJwt, clearJwt};
}