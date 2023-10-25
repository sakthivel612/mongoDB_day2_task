// Users collection

db.usercollection.insertOne({
  _id: "1",
  name: "AkbarBasha",
  email: "akbar@gmail.com",
  experience: "10",
});

// CodeKata collection

db.codekata_collection.insertOne([
  {
    _id: "2",
    user_id: ObjectId("6539a161789d20cac9fbe7eb"), // Reference to Users collection
    problem_solved: "string",
    date_solved: ISODate("2023-10-10T12:00:00Z"),
  },
]);

// Attendance collection
db.Attendance_collection.insertOne([
  {
    _id: "3",
    user_id: ObjectId("6539a161789d20cac9fbe7eb"), // Reference to Users collection
    date: ISODate("2023-10-10T09:00:00Z"),
    present: true,
  },
]);

// Topics collection
db.Topics_collection.insertOne([
  {
    _id: "4",
    name: "Array",
  },
]);

// Tasks collection
db.Tasks_collection.insertOne([
  {
    _id: "5",
    task_name: "web design",
    description: "create a responsive web design",
    start_date: ISODate("2023-10-01T00:00:00Z"),
    end_date: ISODate("2023-10-31T23:59:59Z"),
  },
]);

// CompanyDrives collection
db.CompanyDrives_collection.insertOne([
  {
    _id: "6",
    drive_name: "off campuse drive",
    drive_date: ISODate("2020-10-20T09:00:00Z"),
    distric: "chennai",
    state: "Tamil nadu",
  },
]);

// Mentors collection
db.Mentors_collection.insertMany([
  {
    _id: "7",
    mentor_name: "sanjay",
    mentor_age: "27",
    mentee_count: 20,
  },
  {
    _id: "8",
    mentor_name:"nagarajan",
    mentor_age: "30",
    mentee_count: 24,
  },
  {
    _id: "9",
    mentor_name:"praveen",
    mentor_age: "28",
    mentee_count: 22,
  },
]);


// Find all the topics and tasks which are thought in the month of October

db.Topics_collection.find({}).toArray();
db.Tasks_collection.find({
  $and: [
    { start_date: { $gte: ISODate("2023-10-01T00:00:00Z") } },
    { end_date: { $lte: ISODate("2023-10-31T23:59:59Z") } }
  ]
}).toArray();


// Find all the company drives that appeared between 15 Oct 2020 and 31 Oct 2020:

db.CompanyDrives.find({
    drive_date: {
      $gte: ISODate("2020-10-15T00:00:00Z"),
      $lte: ISODate("2020-10-31T23:59:59Z")
    }
  }).toArray();
  
// Find the number of problems solved by a user in CodeKata:

db.codekata_collection.count({ user_id: ObjectId("6539a161789d20cac9fbe7eb") });

// Find all the mentors with a mentee count greater than 15:

db.Mentors_collection.find({ mentee_count: { $gt: 15 } }).toArray();

// Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020

// Find the number of users who were absent and didn't submit a task between 15 Oct 2020 and 31 Oct 2020
db.usercollection.aggregate([
    {
      $lookup: {
        from: "Attendance",
        localField: "1",
        foreignField: "6539a161789d20cac9fbe7eb",
        as: "attendance"
      }
    },
    {
      $lookup: {
        from: "Tasks",
        localField: "5",
        foreignField: "6539a161789d20cac9fbe7eb",
        as: "tasks"
      }
    },
    {
      $match: {
        $and: [
          { "attendance.date": { $gte: ISODate("2020-10-15T00:00:00Z") } },
          { "attendance.date": { $lte: ISODate("2020-10-31T23:59:59Z") } },
          { "attendance.present": false },
          { "tasks": { $size: 0 } }
        ]
      }
    },
    {
      $count: "absent_users"
    }
  ])
  