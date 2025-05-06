function ChatMessage({ message, user }) {
  const isUser = user && message.uid === user.uid;
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`rounded p-2 ${isUser ? 'bg-blue-500' : 'bg-gray-700'} max-w-xs`}>
        <div className="text-sm font-semibold">{message.displayName}</div>
        <div>{message.text}</div>
      </div>
    </div>
  );
}
export default ChatMessage;
