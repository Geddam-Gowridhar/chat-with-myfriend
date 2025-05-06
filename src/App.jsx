import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import ChatMessage from "./components/ChatMessage";
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch(console.error);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        createdAt: new Date(),
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
      setNewMessage("");
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
    const unsubMessages = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => {
      unsubscribe();
      unsubMessages();
    };
  }, []);

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      <header className="p-4 bg-gray-800 flex justify-between items-center">
        <h1 className="text-xl font-bold">Chat with Me</h1>
        {user ? (
          <button onClick={() => signOut(auth)} className="btn">Sign Out</button>
        ) : (
          <button onClick={signInWithGoogle} className="btn">Sign In</button>
        )}
      </header>
      <main className="flex-1 overflow-auto p-4 space-y-2">
        {messages.map(msg => <ChatMessage key={msg.id} message={msg} user={user} />)}
      </main>
      {user && (
        <form onSubmit={handleSend} className="flex p-4 bg-gray-800">
          <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="flex-1 p-2 rounded bg-gray-700 text-white" placeholder="Type a message..." />
          <button type="submit" className="ml-2 btn">Send</button>
        </form>
      )}
    </div>
  );
}

export default App;
