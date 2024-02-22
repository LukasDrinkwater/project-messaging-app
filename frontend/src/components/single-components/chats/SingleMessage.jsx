export default function SingleMessage({ message, userId }) {
  // set the message class if the message is from the user logged in or not

  let messageClass = "";
  if (message.sender.id === userId) {
    messageClass = "user";
  } else {
    messageClass = "receiver";
  }

  return (
    <>
      <div className={messageClass}>
        {/* if the message isnt from the user show the username */}
        {message.sender.id !== userId && (
          <p className="messageUserName">{message.sender.username}</p>
        )}
        <p className="messageContent">{message.content}</p>
        <p className="messageDateTime">{message.createdAtFormatted}</p>
      </div>
    </>
  );
}
