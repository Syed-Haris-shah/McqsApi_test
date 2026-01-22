import MCQ from "../model/mcqstest.Model.js";
import {fetchStudyMCQs, fetchQuizMCQs} from "../services/mcqstest.services.js";
import { shuffleArray } from "../utils/mcqsShuffle.test.js";

// GET MCQs (Study / Quiz)
export const getMCQs = async (req, res) => {
  try {
    const { category, subject } = req.params;
    const {
      set = 1,
      mode = "study",
      agency,
      q,
    } = req.query;

    // QUIZ MODE
    if (mode === "quiz") {
      const quizData = await fetchQuizMCQs({
        category,
        subject,
        agency,
      });

      const questions = quizData.map((mcq) => ({
        id: mcq._id,
        question: mcq.question,
        options: shuffleArray(mcq.options),
        answer: mcq.answer,
      }));

      return res.json({
        quiz_info: {
          title: `${subject} Online Quiz`,
          total: 10,
        },
        questions,
        grading_rules: {
          perfect: "10/10",
          good: "8/10",
          fail: "< 5/10",
        },
      });
    }

    // STUDY MODE
    const limit = 30;
    const offset = (set - 1) * limit;

    const { results, total } = await fetchStudyMCQs({
      category,
      subject,
      agency,
      q,
      limit,
      offset,
    });

    return res.json({
      meta: {
        subject,
        category,
        set: Number(set),
        limit,
        total_count: total,
        mode: "study",
      },
      results: results.map((m) => ({
        id: m._id,
        question: m.questions,
        options: m.options,
        answer: m.answer,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ADMIN: CREATE MCQ
const createMCQ = async (req, res) => {
  try {
    const { code, category, subject, question, options, answer, agency } = req.body;

    if (!code || !category || !subject || !question || !options || answer === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (answer >= options.length) {
      return res
        .status(400)
        .json({ message: "Answer index out of range" });
    }

    const mcq = await MCQ.create({
      code,
      category,
      subject,
      question,
      options,
      answer,
      agency,
    });

    res.status(201).json({ message: "MCQ created", mcq });
  } catch (error) {
  console.error("CREATE MCQ ERROR:", error.message);
  res.status(500).json({ message: error.message, stack: error.stack });
}
  // catch (error) {
  //   res.status(500).json({ message: "Server Error" });
  // }
};

// ADMIN: UPDATE MCQ
const updateMCQ = async (req, res) => {
  try {
    const updates = req.body;

    if (updates.answer !== undefined && updates.options && updates.answer >= updates.options.length) {
      return res
        .status(400)
        .json({ message: "Answer index out of range" });
    }

    const mcq = await MCQ.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!mcq) {
      return res.status(404).json({ message: "MCQ not found" });
    }

    res.json({ message: "MCQ updated", mcq });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export {createMCQ, updateMCQ};