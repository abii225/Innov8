const { OpenAI } = require("openai");
require("dotenv").config();
const apiKey = process.env.KEY;
// console.log(apiKey);
const openai = new OpenAI({ apiKey: apiKey });
const startingPrompts = {
  MERN: `You will serve as an interviewer and I will be the interviewee candidate. You have to assess the interviewee's coding, conceptual skills related to the JD provided. Your task is to prepare a series of questions related to the job requirements and skills listed by the interviewee. Please ask each question one-by-one and wait for the interviewee to answer before providing feedback and grading the answer. After the interview, create a comprehensive report identifying areas of improvement, strengths, and an overall grade from 0 to 10.

  Please ensure that each question pertains to the job's requirements and the interviewee's skills and expertise.Stop the interview when the I say "stop the interview" and give a detailed feedback in form of an object, following this schema(except the interview key) :const feedbackSchema = new mongoose.Schema({
    interview: { type: mongoose.Schema.Types.ObjectId, ref: "Interview" }, // Reference to the Interview model
    strengths: [{ type: String }], // Array of strengths observed during the interview
    improvementAreas: [{ type: String }], // Areas for improvement noted during the interview
    overallScore: { type: Number }, // Overall score of the interview
  });
  
  Please refer to the job description (JD) and the candidate's provided skills and expertise when developing your questions.
  
  JD: MERN, MongoDB, Express, React and Node (Junior)
  
  Skills: Express, React, Node.
  
  Just ask one question at a time and wait for me to give the answer(If I give a completely wrong or mostly wrong answer you will have to provide the correct answer as your response as well as the next question). Do not give all the questions at once.  Ask the questions one by one.Greet the user first before going on to the first question`,
  Java: `You will serve as an interviewer and I will be the interviewee candidate. You have to assess the interviewee's coding, conceptual skills related to the JD provided. Your task is to prepare a series of questions related to the job requirements and skills listed by the interviewee. Please ask each question one-by-one and wait for the interviewee to answer before providing feedback and grading the answer. After the interview, create a comprehensive report identifying areas of improvement, strengths, and an overall grade from 0 to 10.

  Please ensure that each question pertains to the job's requirements and the interviewee's skills and expertise.Stop the interview when the I say "stop the interview" and give a detailed feedback in form of an object, following this schema(except the interview key) :const feedbackSchema = new mongoose.Schema({
    interview: { type: mongoose.Schema.Types.ObjectId, ref: "Interview" }, // Reference to the Interview model
    strengths: [{ type: String }], // Array of strengths observed during the interview
    improvementAreas: [{ type: String }], // Areas for improvement noted during the interview
    overallScore: { type: Number }, // Overall score of the interview
  });
  
  Please refer to the job description (JD) and the candidate's provided skills and expertise when developing your questions.
  
  JD: Java, SpringBoot
  
  Skills: Java, Spring Boot, Hybernate
  
  Just ask one question at a time and wait for me to give the answer(If I give a completely wrong or mostly wrong answer you will have to provide the correct answer as your response as well as the next question). Do not give all the questions at once.  Ask the questions one by one.Greet the user first before going on to the first question`,
  DSA: `You will serve as an interviewer and I will be the interviewee candidate. You have to assess the interviewee's coding, conceptual skills related to the JD provided. Your task is to prepare a series of questions related to the job requirements and skills listed by the interviewee. Please ask each question one-by-one and wait for the interviewee to answer before providing feedback and grading the answer. After the interview, create a comprehensive report identifying areas of improvement, strengths, and an overall grade from 0 to 10.

  Please ensure that each question pertains to the job's requirements and the interviewee's skills and expertise.Stop the interview when the I say "stop the interview" and give a detailed feedback in form of an object, following this schema(except the interview key) :const feedbackSchema = new mongoose.Schema({
    interview: { type: mongoose.Schema.Types.ObjectId, ref: "Interview" }, // Reference to the Interview model
    strengths: [{ type: String }], // Array of strengths observed during the interview
    improvementAreas: [{ type: String }], // Areas for improvement noted during the interview
    overallScore: { type: Number }, // Overall score of the interview
  });
  
  Please refer to the job description (JD) and the candidate's provided skills and expertise when developing your questions.
  
  JD: Array, String, Two Pointer, Stack & Queues
  
  Skills: Problem solving skills
  
  Just ask one question at a time and wait for me to give the answer(If I give a completely wrong or mostly wrong answer you will have to provide the correct answer as your response as well as the next question).You will need to ask DSA questions to me.Do not give all the questions at once.  Ask the questions one by one.Greet the user first before going on to the first question`,
};
const endingPrompt = `stop the interview. And return the feedback object based on the your evaluation of the questions answered by me. You should only return the feedback object, not a single line or word more. the feedback object should follow this schema(except the interview key). Feedback Object Schema: {
  strengths: [{ type: String }],
  improvementAreas: [{ type: String }],
  overallScore: { type: Number },
};
Remember to only send the feedback object in and nothing else like a variable or something, you response should be something like "{"strengths:"["Good understanding of the concepts",...], "improvementAreas":["Could work on implementations",...],"overallScore":6.5}" , it should just be a strified object and nothing else.Don't even add symbols to your response in the end like ';' '.' etc, it should just be a a stringified JS object that I can perform JSON.parse on.
`;

exports.startInterview = async (req, res, next) => {
  let { type } = req.body;
  console.log(type);
  // get first question from chatgpt
  try {
    const conversation = [{ role: "user", content: startingPrompts[type] }]; //Long prompt about the interview
    // console.log(conversation);
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversation,
    });
    // console.log(response.choices);
    const question = response.choices[0].message.content; //first quesiton from chatgpt
    //create new interview object ( id )
    const newInterview = new Interview({
      user: req.userId,
      interviewType: type,
      videoPath: null,
      conversation: [...conversation, { role: "assistant", content: question }],
      feedback: null,
    });
    await newInterview.save();
    // console.log(newInterview);
    res.status(200).json({
      messsage: "Interview started successfully",
      newInterview,
      latest: question,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  // interviewid:new id of the started interview, 1st question from chatgpt,
};

exports.updateInterview = async (req, res, next) => {
  const { conversation } = req.body;
  const { id } = req.params;
  // console.log(conversation, id);
  //make requestion api recieve a response
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversation,
    });
    // console.log(response.choices);
    const nextQuestion = response.choices[0].message.content;
    // add to conversation newconvo=[...conversation,{ role:"assistant",content: response.data}];
    const newConvo = [
      ...conversation,
      { role: "assistant", content: nextQuestion },
    ];
    //update the Interview FinByIdandUpdate(id, conversatoin:newConversation,{ new:true})
    const updatedInterview = await Interview.findByIdAndUpdate(
      id,
      { conversation: newConvo },
      { new: true }
    );
    // console.log(updatedInterview);

    //send the updated inteview object as responsenextQuestion
    res.status(200).json({
      message: "Updated Successfully",
      updatedInterview,
      latest: nextQuestion,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong while updating" });
  }
};

exports.endInterview = async (req, res, next) => {
  const userId = req.userId;
  const { id } = req.params;
  const { conversation } = req.body;
  const updatedConversation = JSON.parse(conversation);
  const videoPath = req.file ? req.file.path : null;
  console.log(videoPath);
  try {
    // Send chat GPT the ending prompt with the entire conversation and feedback object
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        ...updatedConversation,
        { role: "user", content: endingPrompt },
      ],
    });

    // Extract the object from the API's response
    const ans = response.choices[0].message.content;
    const feedback = JSON.parse(ans);

    // Create a new Feedback object
    const newFeedback = new Feedback({ ...feedback, interview: id });

    // Save the new Feedback object
    await newFeedback.save();

    // Update the interview with the new duration and feedback
    const updatedInterview = await Interview.findByIdAndUpdate(id, {
      feedback: newFeedback._id,
      videoPath,
    });

    // Find the logged-in user and update their pastInterviews
    const loggedInUser = await User.findOne({ _id: userId });
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        pastInterviews: [...loggedInUser.pastInterviews, id],
      },
      { new: true }
    );

    res.status(200).json({
      message: "Thank you for attempting this interview",
      updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Couldn't End Interview" });
  }
};

exports.getInterview = (req, res, next) => {
  // const { interviewId } = req.params; // Assuming interviewId is passed in the request parameters
  // // Retrieve interview details...
  // Interview.findById(interviewId)
  //   .populate("feedback") // If you need to retrieve associated feedback
  //   .exec((err, interview) => {
  //     if (err || !interview) {
  //       // Handle error...
  //       return res.status(404).json({ message: "Interview not found" });
  //     }
  //     // Return interview details
  //     return res.status(200).json({ interview });
  //   });
};
