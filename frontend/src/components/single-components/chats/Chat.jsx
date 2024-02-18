import SingleMessage from "./SingleMessage";

export default function Chat({ chat, userId }) {
  // console.log(chat);
  // console.log(userId);
  return (
    <>
      <div className="ChatContainer">
        {/* map through chat messages */}
        <div>Chat</div>
        {chat.messages?.length > 0 ? (
          chat.messages.map((message) => (
            <SingleMessage key={message.id} message={message} />
          ))
        ) : (
          <p>be the first the message.</p>
        )}
      </div>
    </>
  );
}
