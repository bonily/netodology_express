const User = require('../../models/users');
const Book = require('../../models/book');

module.exports = function(io) {

  io.sockets.on('connection', async(socket) => {
    const userId = socket.request.session.passport.user;
    const {id} = socket;

    let currentUser;
    let currentBook;

    console.log(`Socket connected: ${id}`);

    const {bookName} = socket.handshake.query;
    try {
      currentUser = await User.findById(userId);
      currentBook = await Book.findById(bookName);
    } catch (e) {
        console.error(e);
    }
    
    console.log(`Socket roomName: ${bookName}`);
    socket.join(bookName);
    socket.on('message-to-book', async(msg) => {
        msg.type = `book: ${bookName}`;
        msg.username = currentUser.username;

        try {
          await Book.findByIdAndUpdate(bookName, {comments: [...currentBook.comments, {user: currentUser.username, text: msg.text}]});
        } catch (e) {
            console.error(e);
        }
        socket.to(bookName).emit('message-to-book', msg);
        socket.emit('message-to-book', msg);
    });

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${id}`);
    });
  });
};
