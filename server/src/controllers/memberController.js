import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { sendMemberApprovalCredentialsEmail } from "../services/emailService.js";
import generatePassword from "../utils/generatePassword.js";

export async function allMembers(req, res, next) {
  try {
    const members = await User.find({
      role: "MEMBER",
      status: "APPROVED",
    })
      .select("-passwordHash")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      members,
    });
  } catch (error) {
    next(error);
  }
}

export async function pendingMembers(req, res, next) {
  try {
    return res.json({
      success: true,
      members: await User.find({ status: "PENDING", role: "MEMBER" })
        .select("-passwordHash")
        .sort({ createdAt: -1 }),
    });
  } catch (error) {
    next(error);
  }
}

export async function memberStats(req, res, next) {
  try {
    const grouped = await User.aggregate([
      { $match: { role: "MEMBER" } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    const counts = Object.fromEntries(grouped.map(({ _id, count }) => [_id.toLowerCase(), count]));
    const pending = counts.pending || 0;
    const approved = counts.approved || 0;
    const rejected = counts.rejected || 0;
    const suspended = counts.suspended || 0;
    const total = pending + approved + rejected + suspended;
    return res.json({ success: true, data: { pending, approved, rejected, suspended, total } });
  } catch (error) {
    next(error);
  }
}

export async function getMember(req, res, next) {
  try {
    const member = await User.findById(req.params.id).select("-passwordHash");
    if (!member)
      return res
        .status(404)
        .json({ success: false, message: "Member not found." });
    return res.json({ success: true, member });
  } catch (error) {
    next(error);
  }
}

export async function approveMember(req, res, next) {
  try {
    const member = await User.findById(req.params.id);
    if (!member)
      return res
        .status(404)
        .json({ success: false, message: "Member not found." });
    if (member.status !== "PENDING")
      return res
        .status(409)
        .json({
          success: false,
          message: "Only pending applications can be approved.",
        });
    const temporaryPassword = generatePassword();
    member.passwordHash = await bcrypt.hash(temporaryPassword, 12);
    member.status = "APPROVED";
    member.mustChangePassword = true;
    member.approvedAt = new Date();
    member.approvedBy = req.user._id;
    member.credentialsSent = false;
    member.credentialsSentAt = null;
    await member.save();
    try {
      await sendMemberApprovalCredentialsEmail({
        email: member.email,
        fullName: member.fullName,
        password: temporaryPassword,
      });
      member.credentialsSent = true;
      member.credentialsSentAt = new Date();
      await member.save();
      return res.json({
        success: true,
        message: "Member approved and credential email sent.",
        member: {
          id: member._id,
          status: member.status,
          credentialsSent: true,
          credentialsSentAt: member.credentialsSentAt,
        },
      });
    } catch {
      return res
        .status(502)
        .json({
          success: false,
          message:
            "Member approval succeeded, but credential email could not be sent.",
          member: {
            id: member._id,
            status: member.status,
            credentialsSent: false,
            credentialsSentAt: null,
          },
        });
    }
  } catch (error) {
    next(error);
  }
}

export async function rejectMember(req, res, next) {
  try {
    const member = await User.findById(req.params.id);
    if (!member) return res.status(404).json({ success: false, message: "Member not found." });
    if (member.status !== "PENDING") return res.status(409).json({ success: false, message: "Only pending applications can be rejected." });
    member.status = "REJECTED";
    member.rejectedAt = new Date();
    member.rejectedBy = req.user._id;
    await member.save();
    return res.json({ success: true, message: "Membership application rejected.", member: { id: member._id, status: member.status } });
  } catch (error) {
    next(error);
  }
}

export async function publicMembers(req, res, next) {
  try {
    const members = await User.find({
      role: "MEMBER",
      status: "APPROVED",
    })
      .select(
        "fullName profilePhoto requestedDesignation occupation city state district"
      )
      .sort({ approvedAt: -1, createdAt: -1 });

    return res.json({
      success: true,
      members,
    });
  } catch (error) {
    next(error);
  }
}