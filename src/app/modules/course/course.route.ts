import express from 'express';
import { validateSchema } from '../../middlewares/validateSchema';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';
const router = express.Router();

router.post(
  '/create-course',
  validateSchema(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourseIntro,
);
router.get('/', CourseControllers.getAllCourses);
router.get('/:courseId', CourseControllers.getCourseById);
router.patch(
  '/:courseId',
  validateSchema(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);
router.delete('/:courseId', CourseControllers.deleteCourse);
router.put(
  '/:courseId/assign-faculties',
  validateSchema(CourseValidations.facultieswithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourseInto,
);
router.put(
  '/:courseId/remove-faculties',
  validateSchema(CourseValidations.facultieswithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse,
);

export const CourseRoutes = router;
