exports.getSuccessMessage = (req, res, next) => {
    res.render('success', {
      pageTitle: 'Success',
      path: '/success'
    });
};

exports.postSuccessMessage = (req, res, next) => {
    res.render('success', {
      pageTitle: 'Success',
      path: '/success'
    });
};