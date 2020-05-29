exports.pong = (req, res) => {
  res.send("hello");
};

exports.setSession = (req, res) => {
  req.session.username = "oop";
  res.send("set session.username = oop");
};

exports.getSession = (req, res) => {
  if (req.session.username) {
    res.send(`hello ${req.session.username}`);
  } else {
    res.send(`no username in session`);
  }
};

exports.getCsrfToken = (req, res) => {
  res.send(req.csrfToken());
};
