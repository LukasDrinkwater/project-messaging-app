import SingleMessage from "./SingleMessage";

export default function Chat({ chatMessages, userId }) {
  console.log(chatMessages);
  // console.log(userId);
  return (
    <>
      <div className="ChatContainer">
        {/* map through chat messages */}
        <div>Chat</div>
        {chatMessages?.length > 0 ? (
          chatMessages.map((message) => (
            <SingleMessage key={message.id} message={message} userId={userId} />
          ))
        ) : (
          <p>be the first the message.</p>
        )}
      </div>
    </>
  );
}
