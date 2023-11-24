import { Course } from "../../domain/Course";

export interface CourseRepository {
  get(courseId: string): Promise<Course>;
}
