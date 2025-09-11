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
	const [isLoading, setIsLoading] = useState(true);
	const [imageError, setImageError] = useState(false);

	useEffect(() => {
		const loadResume = async () => {
			try {
				setIsLoading(true);
				const blob = await fs.read(imagePath);
				if (!blob) {
					setImageError(true);
					return;
				}
				let url = URL.createObjectURL(blob);
				setResumeUrl(url);
				setImageError(false);
			} catch (error) {
				setImageError(true);
			} finally {
				setIsLoading(false);
			}
		};

		loadResume();

		// Cleanup function to revoke object URL
		return () => {
			if (resumeUrl) {
				URL.revokeObjectURL(resumeUrl);
			}
		};
	}, [imagePath]);

	return (
		<Link
			to={`/resume/${id}`}
			className="group block transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]">
			<div className="relative h-full">
				{/* Animated gradient border */}
				<div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-sm opacity-0 group-hover:opacity-75 transition-all duration-500 animate-gradient-x"></div>

				{/* Main card */}
				<div className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 overflow-hidden h-full flex flex-col">
					{/* Header section */}
					<div className="p-6 bg-gradient-to-r from-white/50 to-white/30 border-b border-white/20">
						<div className="flex items-start justify-between mb-4">
							<div className="flex-1 min-w-0">
								{companyName && (
									<h3 className="text-xl font-bold text-gray-800 truncate mb-1 group-hover:text-blue-600 transition-colors duration-300">
										{companyName}
									</h3>
								)}
								{jobTitle && (
									<p className="text-sm text-gray-600 truncate font-medium">
										{jobTitle}
									</p>
								)}
								{!companyName && !jobTitle && (
									<h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
										Resume
									</h3>
								)}
							</div>

							{/* Score circle with enhanced design */}
							<div className="ml-4 flex-shrink-0 relative">
								<div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
								<div className="relative">
									<ScoreCircle
										score={feedback.overallScore}
									/>
								</div>
							</div>
						</div>

						{/* Quick stats */}
						<div className="flex items-center space-x-4 text-xs text-gray-500">
							<div className="flex items-center space-x-1">
								<svg
									className="w-3 h-3"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<span>AI Analyzed</span>
							</div>
							<div className="w-1 h-1 bg-gray-300 rounded-full"></div>
							<div className="flex items-center space-x-1">
								<svg
									className="w-3 h-3"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13 10V3L4 14h7v7l9-11h-7z"
									/>
								</svg>
								<span>Score: {feedback.overallScore}/100</span>
							</div>
						</div>
					</div>

					{/* Resume preview section */}
					<div className="flex-1 p-4">
						<div className="relative h-full">
							{/* Gradient border for image */}
							<div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-sm"></div>

							<div className="relative bg-white rounded-2xl overflow-hidden shadow-inner h-full min-h-[300px] group-hover:shadow-lg transition-all duration-300">
								{isLoading && (
									<div className="flex items-center justify-center h-full bg-gray-50">
										<div className="text-center">
											<div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-2"></div>
											<p className="text-sm text-gray-500">
												Loading preview...
											</p>
										</div>
									</div>
								)}

								{!isLoading && imageError && (
									<div className="flex items-center justify-center h-full bg-gray-50">
										<div className="text-center p-8">
											<svg
												className="w-16 h-16 text-gray-300 mx-auto mb-4"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={1}
													d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
												/>
											</svg>
											<p className="text-sm text-gray-500">
												Preview not available
											</p>
										</div>
									</div>
								)}

								{!isLoading && !imageError && resumeUrl && (
									<div className="h-full relative overflow-hidden">
										<img
											src={resumeUrl}
											alt="Resume preview"
											className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
											onError={() => setImageError(true)}
										/>
										{/* Overlay gradient for better readability */}
										<div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent"></div>
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Footer with action hint */}
					<div className="p-4 pt-0">
						<div className="flex items-center justify-between text-xs text-gray-500 bg-gray-50/50 rounded-xl p-3 group-hover:bg-blue-50/50 transition-colors duration-300">
							<span>Click to view details</span>
							<svg
								className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</div>
					</div>

					{/* Hover effect overlay */}
					<div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
				</div>
			</div>

			<style>{`
				@keyframes gradient-x {
					0%, 100% {
						background-size: 200% 200%;
						background-position: left center;
					}
					50% {
						background-size: 200% 200%;
						background-position: right center;
					}
				}
				.animate-gradient-x {
					animation: gradient-x 3s ease infinite;
				}
			`}</style>
		</Link>
	);
};

export default ResumeCard;
