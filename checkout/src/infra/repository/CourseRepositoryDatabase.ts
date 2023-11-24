import pgp from "pg-promise";

import { Course } from "../../domain/Course";
import { CourseRepository } from "../../application/repository/CourseRepository";

export class CourseRepositoryDatabase implements CourseRepository {
  async get(courseId: string): Promise<Course> {
    const connection = pgp()("postgres://postgres:postgres@localhost:5432/app");
    const [courseData] = await connection.query(
      "select * from skt.course where course_id = $1",
      [courseId]
    );
    await connection.$pool.end();
    return new Course(
      courseData.courseId,
      courseData.title,
      parseFloat(courseData.amount)
    );
  }
}
