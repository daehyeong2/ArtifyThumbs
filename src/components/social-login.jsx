import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { FirebaseError } from "firebase/app";
import { doc, getDoc, setDoc } from "firebase/firestore";

const OAuthList = styled.ul`
  display: flex;
  gap: 10px;
  list-style: none;
  padding: 0;
`;

const OAuth = styled.li`
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    color: #0984e3;
    border: 1px solid #0984e3;
  }
`;

const errors = {
  "permission-denied":
    "권한 오류가 발생했습니다. 같은 문제가 반복된다면 문의하기를 통해 오류를 신고해 주세요.",
  "auth/account-exists-with-different-credential":
    "다른 인증 방식으로 가입된 계정이 이미 존재합니다.",
};

const generateRandomString = (num) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

const SocialLogin = () => {
  const onLoginGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const credentials = await signInWithPopup(auth, provider);
      const userRef = doc(db, "users", credentials.user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        await updateProfile(auth.currentUser, {
          displayName: userData.username,
          photoURL: userData.photoURL,
        });
        return (window.location.href = "/");
      }
      const username =
        credentials.user.displayName ?? `user-${generateRandomString(5)}`;
      await setDoc(userRef, {
        username,
        isAdmin: true,
        createdAt: Date.now(),
        userId: credentials.user.uid,
        photoURL: credentials.user.photoURL ?? "/img/user.jpeg",
        isSocial: true,
      });
      if (username !== credentials.user.displayName) {
        await updateProfile(auth.currentUser, {
          displayName: username,
        });
      }
      return (window.location.href = "/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        alert(errors[e.code]);
      } else {
        console.error(e);
      }
    }
  };
  const onLoginGithub = async () => {
    try {
      const provider = new GithubAuthProvider();
      const credentials = await signInWithPopup(auth, provider);
      const userRef = doc(db, "users", credentials.user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        await updateProfile(auth.currentUser, {
          displayName: userData.username,
          photoURL: userData.photoURL,
        });
        return (window.location.href = "/");
      }
      const username =
        credentials.user.displayName ?? `user-${generateRandomString(5)}`;
      await setDoc(userRef, {
        username,
        isAdmin: true,
        createdAt: Date.now(),
        userId: credentials.user.uid,
        photoURL: credentials.user.photoURL ?? "/img/user.jpeg",
        isSocial: true,
      });
      if (username !== credentials.user.displayName) {
        await updateProfile(auth.currentUser, {
          displayName: username,
        });
      }
      return (window.location.href = "/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        alert(errors[e.code]);
      } else {
        console.error(e);
      }
    }
  };
  return (
    <OAuthList>
      <OAuth>
        <FontAwesomeIcon onClick={onLoginGoogle} icon={faGoogle} />
      </OAuth>
      <OAuth>
        <FontAwesomeIcon onClick={onLoginGithub} icon={faGithub} />
      </OAuth>
    </OAuthList>
  );
};

export default SocialLogin;
