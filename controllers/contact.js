exports.getContactForm = (req, res, next) => {
    res.render('contact', {
      pageTitle: 'Contact Us',
      path: '/contactus'
    });
  };
  