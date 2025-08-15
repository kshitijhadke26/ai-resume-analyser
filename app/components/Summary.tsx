import ScoreGuage from "./ScoreGuage";
import ScoreBadge from "./ScoreBadge";

const Category = ({ title, score }: { title: string; score: number }) => {
	const textColor =
		score >= 70
			? "text-green-500"
			: score >= 50
				? "text-yellow-500"
				: "text-red-500";

	return (
		<div className="resume-summary">
			<div className="category">
				<div className="flex flex-row gap-2 items-center justify-center">
					<p className="text-2xl">{title}</p>
					<ScoreBadge score={score} />
				</div>
				<p className="text-2xl">
					<span className={textColor}>{score}</span>/100
				</p>
			</div>
		</div>
	);
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
	return (
		<div className="bg-white rounded-2xl shadow-md w-full">
			<div className="flex flex-row items-center p-4 gap-8">
				<ScoreGuage score={feedback.overallScore} />

				<div className="flex flexcol gap-2">
					<h2 className="text-2xl font-bold">Overall Score</h2>
					<p className="text-sm text-gray-500">
						This is the overall score for your resume based on all
						the factors considered.
					</p>
				</div>
			</div>

			<Category
				title="Tone & Style"
				score={feedback.toneAndStyle.score}
			/>
			<Category title="Content" score={feedback.content.score} />
			<Category title="Structure" score={feedback.structure.score} />
			<Category title="Skills" score={feedback.skills.score} />
		</div>
	);
};

export default Summary;
