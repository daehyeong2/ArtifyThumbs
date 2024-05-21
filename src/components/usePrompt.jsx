import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { isBlockedAtom } from "../atom";

function usePrompt(message, when) {
  const setIsBlocked = useSetRecoilState(isBlockedAtom);
  useEffect(() => {
    if (!when) return;

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [message, when]);

  const confirmNavigation = (callback) => {
    if (when) {
      const confirm = window.confirm(message);
      if (confirm) {
        callback();
        setIsBlocked(false);
      }
    } else {
      callback();
    }
  };

  return confirmNavigation;
}

export default usePrompt;
