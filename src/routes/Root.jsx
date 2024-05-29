import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import MainFooter from "../components/Footer";
import pageScrollTop from "../components/pageScrollTop";
import TopButton from "../components/TopButton";
import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import LoadingScreen from "../components/LoadingScreen";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  isBlockedAtom,
  userAtom,
  userIsLoadedAtom,
  widthAtom,
  isMobileAtom,
} from "../atom";
import { doc, getDoc } from "firebase/firestore";
import EmailVerification from "../components/EmailVerification";
import usePrompt from "../components/usePrompt";
import {
  ReCaptchaEnterpriseProvider,
  initializeAppCheck,
} from "firebase/app-check";
import { getApp } from "firebase/app";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Root = () => {
  pageScrollTop();
  const user = auth.currentUser;
  const [isLoading, setLoading] = useState(false);
  const isBlocked = useRecoilValue(isBlockedAtom);
  const setUser = useSetRecoilState(userAtom);
  const setUserIsLoaded = useSetRecoilState(userIsLoadedAtom);
  const setWidth = useSetRecoilState(widthAtom);
  const setIsMobile = useSetRecoilState(isMobileAtom);
  const init = useCallback(async () => {
    setLoading(true);
    if (navigator.userAgent !== "ReactSnap") {
      initializeAppCheck(getApp(), {
        provider: new ReCaptchaEnterpriseProvider(
          "6LfrLOkpAAAAACD1BJETfXY-pHINuxMRY--t6l3S"
        ),
        isTokenAutoRefreshEnabled: true,
      });
    }
    await auth.authStateReady();
    if (auth.currentUser) {
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const user = userSnap.data();
        setUser(user);
      }
    }
    setLoading(false);
    setUserIsLoaded(true);
  }, [setUser, setUserIsLoaded]);
  useEffect(() => {
    const handleResize = () => {
      const isMobile = !(window.innerWidth > 885);
      setIsMobile(isMobile);
      setWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setWidth, setIsMobile]);
  useEffect(() => {
    init();
  }, [init]);
  usePrompt("정말로 떠나시겠습니까?", isBlocked);
  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : !user || user.emailVerified ? (
        <>
          <NavBar />
          <Wrapper>
            <Outlet />
          </Wrapper>
          <MainFooter />
          <TopButton />
        </>
      ) : (
        <EmailVerification />
      )}
    </>
  );
};

export default Root;
