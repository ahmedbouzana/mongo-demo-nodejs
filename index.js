const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err)); //connection

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.nom },
  isPublished: Boolean
}); // Create model

const Course = mongoose.model("Course", courseSchema); //instantiation

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Ahmed",
    tags: ["angular", "frontend"],
    isPublished: true
  }); //create object

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  //const courses = await Course.find(); //get all courses
  const courses = await Course.find({ author: "Ahmed", isPublished: true })
    .limit(10)
    .sort({ name: 1 }) //1 for asc, -1 for desc
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

//createCourse();

getCourses();
