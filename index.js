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

  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course
    //.find({ author: "Ahmed", isPublished: true })
    //.find({price: {$gte: 10, $lte: 20 } } ) //price great than or equal 10 and less than or equal 20
    //.find({price: {$in:[10, 15, 20] } } )  // price == 10 or 15 or 20 
    .find()
    .or([{author : "Ahmed"}, {author : "Yacine"}]) // or logique
    .and([{isPublished: true}]) // and logique
    /* .skip((pageNumber - 1) * pageSize)
    .limit(pageSize) */ // pagination ex api/courses?pageNumber=2&pageSize=10
    .limit(10)
    .sort({ name: 1 }) //1 for asc, -1 for desc
    //.count()
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

//createCourse();

getCourses();
