export const onSubmit = async (data, actions) => {
    const {
        submitLoading,
        questions,
        userAnswer,
        userMeta,
        quizJson,
        totalDuration,
        timeLeftRef,
        hasStudentDetails,
        waitForStudentDetails, askUser,
        handleValidateAnswerApi,
    } = data;

    const {
        setSubmitLoading,
        setIsTimerRunning,
        setAlertModal,
        setSlideAlertModal,
        setShowResult,
        setResultData,
        setCurrentQuesIndex,
    } = actions;

    if (submitLoading) return;
    const unansweredQuestions = questions.filter(
        (question) =>
            !userAnswer?.some(
                (answer) =>
                    answer.questionId === question._id &&
                    answer.selectAnswerIndex !== -1
            )
    );

    if (unansweredQuestions.length > 0) {
        const questionNumbers = unansweredQuestions
            .map(
                (question) =>
                    questions.findIndex(
                        (q) => q._id === question._id
                    ) + 1
            )
            .join(", ");

        const reviewQuestions = await askUser({
            type: "warning",
            title: `${unansweredQuestions.length} Question${unansweredQuestions.length > 1 ? "s" : ""
                } Unanswered`,
            message: `You haven't answered ${unansweredQuestions.length > 1
                ? "these questions"
                : "this question"
                }: ${questionNumbers}. Do you want to answer them before submitting?`,
            confirmText: "Review Questions",
            cancelText: "Submit Anyway",
        });

        if (reviewQuestions) {
            const firstUnansweredIndex = questions.findIndex(
                (question) =>
                    !userAnswer?.some(
                        (answer) =>
                            answer.questionId === question._id &&
                            answer.selectAnswerIndex !== -1
                    )
            );

            if (firstUnansweredIndex !== -1) {
                setCurrentQuesIndex(firstUnansweredIndex);
            }

            return;
        }

        // reviewQuestions === false
        // User clicked "Submit Anyway"
        // yahan se submission continue hogi
    }

    let studentData = userMeta.student;

    setSubmitLoading(true);
    setIsTimerRunning(false);

    try {
        if (!hasStudentDetails) {
            const result = await waitForStudentDetails();

            if (!result.confirmed) {
                setSubmitLoading(false);
                setIsTimerRunning(true);
                return;
            }

            studentData = result.student;
        }

        const submittedIn =
            totalDuration - timeLeftRef.current;

        const res = await handleValidateAnswerApi({
            ...userMeta,
            quizId: quizJson._id,

            answer: userAnswer.map((item) => ({
                ...item,
                questionText: item.questionText,
                selectAnswerIndex: item.selectAnswerIndex,
            })),

            student: studentData,
            submittedIn,
            quizDuration: totalDuration,
        });

        if (res.success) {
            const result = res.data.quiz;

            if (!result) {
                setSlideAlertModal({
                    open: true,
                    type: "warning",
                    message: "Result data is not available.",
                });

                return;
            }

            const {
                correctAnswers,
                wrongAnswers,
                notAnswered,
                title,
                subject,
                totalQuestions,
                totalMarks,
                obtainedMarks,
                submittedIn,
                submittedAt,
            } = result;

            const isValidResult =
                Number.isFinite(Number(totalQuestions)) &&
                Number.isFinite(Number(totalMarks)) &&
                Number.isFinite(Number(obtainedMarks)) &&
                Number.isFinite(Number(submittedIn)) &&
                submittedAt;

            if (!isValidResult) {
                setSlideAlertModal({
                    open: true,
                    type: "warning",
                    message: "Incomplete result data received.",
                });

                return;
            }

            setShowResult(true);

            setResultData({
                correctAnswers,
                wrongAnswers,
                notAnswered,
                title,
                subject,
                totalQuestions: Number(totalQuestions),
                totalMarks: Number(totalMarks),
                obtainedMarks: Number(obtainedMarks),
                submittedIn: Number(submittedIn),
                submittedAt,
            });

            setSlideAlertModal({
                open: true,
                type: "success",
                message:
                    res.message ||
                    "Quiz submitted successfully.",
            });
        } else {
            if (res.errorCode === 101) {
                setAlertModal({
                    open: true,
                    type: "warning",
                    title: "Quiz Already Submitted",
                    message:
                        "You have already submitted this quiz. You cannot submit the same quiz again.",
                    confirmText: "Okay",
                    cancelText: "",
                });

                return;
            }

            setAlertModal({
                open: true,
                type: "error",
                title: "Submission Failed",
                message:
                    res.message ||
                    "Unable to submit quiz. Please try again.",
                confirmText: "Okay",
                cancelText: "",
            });
        }
    } catch (error) {
        console.error(error);

        setSlideAlertModal({
            open: true,
            type: "error",
            message:
                "Something went wrong while submitting the quiz.",
        });
    } finally {
        setSubmitLoading(false);
    }
};