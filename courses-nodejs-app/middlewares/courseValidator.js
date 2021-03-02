const urlPattern = /^https?/;
module.exports = (req, res, next) => {
    const {title, description, imageUrl} = req.body;
    if(!title || !description || !imageUrl) {
        const error = 'Course title, description and image URL are required fields.';
        return res.render('course/create', { notification: { error } });
    }
    if (title.length < 4) {
        const error = 'Title must be at least 4 characters.';
        return res.render('course/create', { notification: { error } });
    }
    if (description.length < 20) {
        const error = 'Description must be at least 20 characters.';
        return res.render('course/create', { notification: { error } });S
    }
    if (!urlPattern.exec(imageUrl)) {
        const error = 'Invalid image URL provided.';
        return res.render('course/create', { notification: { error } });
    }
    next();
}