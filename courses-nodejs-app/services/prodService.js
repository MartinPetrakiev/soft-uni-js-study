const Course = require('../models/Course');

function createCourse(data, userId) {
    let date = new Date().toISOString();
    console.log(typeof date);
    let course = new Course({ ...data, creator: userId, dateCreated: date });

    return course.save();
}

function getById(id) {
    return Course.findById(id).lean();
}

async function getAll(query) {
    let courses = await Course.find({
        ...(query.search && { title: { $regex: query.search, $options: 'i' } })
    }).lean();
    return courses;
}

async function enrollCourse(courseId, userId) {
    let course = await Course.findById(courseId).lean();
    let updatedCourse = await Course.updateOne(
        { _id: { $eq: courseId } },
        Object.assign(course, {
            enrolled: [...course.enrolled, userId]
        }));
    return updatedCourse;
}

async function editCourse(courseId, data) {
    let updatedCourse = await Course.updateOne({ _id: { $eq: courseId } }, data);
    return updatedCourse;
}

async function deleteCourse(id) {
    let course = await Course.deleteOne({ _id: { $eq: id } });
    return course;
}

// async function getUserOffers(id) {
//     let offers = await Course.find({ buyers: { _id: id } }).lean();
//     return offers;
// }

module.exports = {
    getAll,
    getById,
    createCourse,
    enrollCourse,
    editCourse,
    deleteCourse,
    // getUserOffers
};