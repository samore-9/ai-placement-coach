import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { getDashboardOverview } from '../services/dashboard.service.js';

export const getOverview = asyncHandler(async (req, res) => {
  const overview = await getDashboardOverview(req.user._id);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, overview, 'Dashboard overview'));
});
