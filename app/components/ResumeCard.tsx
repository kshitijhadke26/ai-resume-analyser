import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({
	resume: { id, companyName, jobTitle, imagePath, resumePath, feedback },
}: {
	resume: Resume;
}) => {
	const { fs } = usePuterStore();
	const [resumeUrl, setResumeUrl] = useState("");

	useEffect(() => {
		const loadResume = async () => {
			const blob = await fs.read(imagePath);
			if (!blob) return;
			let url = URL.createObjectURL(blob);
			setResumeUrl(url);
		};

		loadResume();
	}, [imagePath]);

	return (
		<Link
			to={`/resume/${id}`}
			className="resume-card animate-in fade-in duration-1000">
			<div className="resume-card-header">
				<div className="flex flex-col text-center">
					{companyName && (
						<h3 className="!text-black text-xl font-bold break-words">
							{companyName}
						</h3>
					)}
					{jobTitle && (
						<h3 className="text-md break-words text-gray-500">
							{jobTitle}
						</h3>
					)}
					{!companyName && !jobTitle && (
						<h2 className="!text-black font-bold">Resume</h2>
					)}
				</div>
				<div className="flex-shrink-0">
					<ScoreCircle score={feedback.overallScore} />
				</div>
			</div>
			{resumeUrl && (
				<div className="gradint-border animate-in fade-in duration-1000">
					<div className="w-full h-full">
						<img
							src={resumeUrl}
							alt="resume"
							className="w-full h-[390px] max-sm:h-[350px] object-cover object-top"
						/>
					</div>
				</div>
			)}
		</Link>
	);
};

export default ResumeCard;
