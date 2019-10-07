module.exports = {
  // This middleware will check if user's cookie is still saved in browser and
  // user is not set, then automatically log the user out. This usually happens
  // when you stop your express server after login, your cookie still remains
  // saved in the browser.
  clearInvalidCookies(req, res, next) {
    if (req.cookies.sid && !req.session.user) {
      res.clearCookie('mnemosyne.sid');
    }
    return next();
  },
};