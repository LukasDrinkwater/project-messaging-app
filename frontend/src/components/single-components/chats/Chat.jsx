import SingleMessage from "./SingleMessage";

export default function Chat({ chatMessages, userId, contact }) {
  return (
    <>
      <div className="ChatContainer">
        {/* map through chat messages */}
        <div className="currentChatContact">
          <h1>{contact}</h1>
        </div>

        {chatMessages?.length > 0 ? (
          chatMessages.map((message) => (
            <SingleMessage key={message.id} message={message} userId={userId} />
          ))
        ) : (
          <p>Be the first to message.</p>
        )}
      </div>
    </>
  );
}
