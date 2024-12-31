import { useState, useEffect } from "react";
import { Box, Container, VStack, Button, HStack } from "@chakra-ui/react";
import Message from "./components/Message";
import { app } from "./firebase";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import {
  onAuthStateChanged,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const auth = getAuth(app);
const db = getFirestore(app);

const logoutHandler = () => {
  signOut(auth);
};

const loginHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

function App() {
  const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"));
  const [user, setuser] = useState(false);
  const [message, setmessage] = useState("");
  const [messages, setmessages] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "Messages"), {
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp(),
      });

      setmessage("");
    } catch (error) {
      console.error("Error is: ", error);
    }
  };

  const unsubscribe = useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setuser(user);
      } else {
        setuser(null);
      }
    });

    const unsubscribeMessages = onSnapshot(
      q,
      collection(db, "Messages"),
      (snapshot) => {
        setmessages(
          snapshot.docs.map((doc) => {
            const id = doc.id;
            return { ...doc.data(), id };
          })
        );
      }
    );

    return () => {
      unsubscribe;
      unsubscribeMessages;
    };
  });

  return (
    <Box bg={"red.50"}>
      {user ? (
        <Container h={"100vh"} bg={"white"}>
          <VStack h="full" paddingY={"4"}>
            <Button onClick={logoutHandler} colorScheme={"red"} w={"full"}>
              Logout
            </Button>
            <VStack h="full" w={"full"} overflowY={"auto"}>
              {messages.map((msg, index) => (
                <Message
                  key={index}
                  text={msg.text}
                  uri={msg.uri}
                  user={msg.uid === user.uid ? "me" : "other"}
                />
              ))}
              {/* <Message text={"Hello"} user={"me"} /> */}
            </VStack>

            <form onSubmit={submitHandler} style={{ width: "100%" }}>
              <HStack>
                <input
                  value={message}
                  onChange={(e) => setmessage(e.target.value)}
                  placeholder="Enter a Message"
                  style={{ width: "100%", padding: "4px" }}
                />
                <Button colorScheme={"purple"} type="submit">
                  Send
                </Button>
              </HStack>
            </form>
          </VStack>
        </Container>
      ) : (
        <VStack justifyContent={"center"} h={"100vh"}>
          <Button onClick={loginHandler} colorScheme="purple">
            Login with Google
          </Button>
        </VStack>
      )}
    </Box>
  );
}

export default App;
