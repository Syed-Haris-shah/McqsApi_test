import MCQ from "../model/mcqstest.Model.js";

const fetchStudyMCQs = async ({
  category,
  subject,
  agency,
  q,
  limit,
  offset,
}) => {
  const filter = { category, subject };

  if (agency) {filter.agency = agency};
  if (q) { filter.q = { $regex: q, $options: "i" }};

  const results = await MCQ.find(filter)
    .skip(offset)
    .limit(limit)
    .select("-__v");

  const total = await MCQ.countDocuments(filter);

  return { results, total };
};

const fetchQuizMCQs = async ({ category, subject, agency }) => {
  const match = { category, subject };
  if (agency) match.agency = agency;

  return MCQ.aggregate([
    { $match: match },
    { $sample: { size: 10 } },
  ]);
};

export {fetchStudyMCQs, fetchQuizMCQs}