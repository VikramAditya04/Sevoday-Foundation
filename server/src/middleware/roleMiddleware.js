export function authorize(...roles) {
  return (req, res, next) =>
    req.user && roles.includes(req.user.role)
      ? next()
      : res
          .status(403)
          .json({
            success: false,
            message: "You are not authorized to perform this action.",
          });
}
