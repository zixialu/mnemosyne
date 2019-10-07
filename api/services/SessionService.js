module.exports = {
  hasValidSession(req) {
    return req.session.user && req.cookies.sid;
  },

  addUserToSession(session, user = {}) {
    if (!session) throw new Error('No session was provided');
    const { id, username, email } = user;
    if (!id || !username || !email) throw new Error('Insufficent user info was provided');

    session.user = {
      id,
      username,
      email,
    };
  },
};
