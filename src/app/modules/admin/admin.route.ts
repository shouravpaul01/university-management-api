import express from 'express';
import { AdminControllers } from './admin.controller';
import { validateSchema } from '../../middlewares/validateSchema';
import { AdminValidations } from './admin.validation';

const router = express.Router();

router.get('/', AdminControllers.getAllAdmins);

router.get('/:id', AdminControllers.getAdminById);

router.patch(
  '/:id',
  validateSchema(AdminValidations.updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;
