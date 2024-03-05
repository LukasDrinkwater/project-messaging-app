import SingleMessage from "../chats/SingleMessage";

export default function GroupChat({
  groupChatMessages,
  userId,
  groupChatName,
}) {
  return (
    <>
      <div className="groupChatContainer">
        <div className="groupChatName">
          <h1>{groupChatName}</h1>
        </div>
        {/* map through the group chat messages */}

        {groupChatMessages?.length > 0 ? (
          groupChatMessages.map((message) => (
            <SingleMessage key={message.id} message={message} userId={userId} />
          ))
        ) : (
          <p>Be the first to message</p>
        )}
      </div>
    </>
  );
}
