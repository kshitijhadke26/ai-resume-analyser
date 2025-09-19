import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Footer from "~/components/Footer";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "ResumeRadar" },
		{
			name: "description",
			content:
				"An AI-powered platform that scans, analyzes, and scores resumes to spotlight top talent instantly.",
		},
	];
}

export default function Home() {
	const { auth, kv } = usePuterStore();
	const navigate = useNavigate();
	const [resumes, setResumes] = useState<Resume[]>([]);
	const [loadingResume, setLoadingResume] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		if (!auth.isAuthenticated) navigate("/auth?next=/");
	}, [auth.isAuthenticated]);

	useEffect(() => {
		const loadResumes = async () => {
			setLoadingResume(true);
			const resumes = (await kv.list("resume:*", true)) as KVItem[];
			const parsedResumes = resumes?.map(
				(resume) => JSON.parse(resume.value) as Resume
			);

			//console.log(parsedResumes);
			setResumes(parsedResumes || []);
			setLoadingResume(false);
		};

		loadResumes();
	}, [kv]);

	return (
		<main className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
			{/* Animated background elements */}
			<div className="absolute inset-0">
				<div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute top-60 right-20 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
				<div className="absolute bottom-40 left-1/4 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
			</div>

			{/* Floating particles */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{[...Array(15)].map((_, i) => (
					<div
						key={i}
						className="absolute w-1 h-1 bg-blue-400/40 rounded-full animate-bounce"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							animationDelay: `${Math.random() * 3}s`,
							animationDuration: `${4 + Math.random() * 3}s`,
						}}></div>
				))}
			</div>

			<div className="relative z-10 flex flex-col min-h-screen">
				<Navbar />

				<section className="flex-grow px-4 sm:px-6 lg:px-8">
					{/* Hero Section */}
					<div
						className={`text-center py-10 transform transition-all duration-1000 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
						<div className="max-w-4xl mx-auto">
							<h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
								Monitor Your Job Applications & AI Resume Scores
							</h1>

							{!loadingResume && resumes.length === 0 && (
								<h2 className="text-xl md:text-2xl text-gray-600 mb-4 font-medium">
									No resume found. Upload your first resume to
									get
									<span className="text-blue-600 font-semibold">
										{" "}
										AI-powered feedback
									</span>
									.
								</h2>
							)}

							<p className="text-lg md:text-xl text-gray-600 font-medium">
								Review, improve, and stand out with AI-powered
								insights.
							</p>

							{/* Decorative line */}
							<div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-8"></div>
						</div>
					</div>

					{/* Loading State */}
					{loadingResume && (
						<div
							className={`flex flex-col items-center justify-center py-20 transform transition-all duration-1000 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
							<div className="relative mb-8">
								<div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
								<div className="relative bg-white/80 backdrop-blur-sm rounded-full p-8 shadow-2xl border border-white/20">
									<img
										src="/images/resume-scan-2.gif"
										alt="resume scanning"
										className="w-32 h-32 object-contain"
									/>
								</div>
							</div>
							<div className="text-center">
								<h3 className="text-xl font-semibold text-gray-700 mb-2">
									Analyzing Your Resumes
								</h3>
								<p className="text-gray-500">
									AI is processing your documents...
								</p>
							</div>
						</div>
					)}

					{/* Resumes Grid */}
					{!loadingResume && resumes.length > 0 && (
						<div
							className={`pb-16 transform transition-all duration-1000 delay-300 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
							<div className="max-w-7xl mx-auto">
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
									{resumes.map((resume, index) => (
										<div
											key={resume.id}
											className="transform transition-all duration-500"
											style={{
												animationDelay: `${index * 100}ms`,
											}}>
											<ResumeCard resume={resume} />
										</div>
									))}
								</div>
							</div>
						</div>
					)}

					{/* Empty State with CTA */}
					{!loadingResume && resumes.length === 0 && (
						<div
							className={`flex flex-col items-center justify-center py-10 transform transition-all duration-1000 delay-500 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
							<Link
								to="/upload"
								className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0">
								<div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
								<div className="relative flex items-center space-x-3">
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
										/>
									</svg>
									<span className="text-xl">
										Upload Resume
									</span>
								</div>

								{/* Ripple effect */}
								<div className="absolute inset-0 rounded-2xl overflow-hidden">
									<div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transform scale-0 group-hover:scale-100 transition-all duration-500 rounded-full"></div>
								</div>
							</Link>

							{/* Features preview */}
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
								{[
									{
										icon: (
											<svg
												className="w-8 h-8"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={1.5}
													d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
												/>
											</svg>
										),
										title: "AI Analysis",
										desc: "Get instant feedback powered by advanced AI",
									},
									{
										icon: (
											<svg
												className="w-8 h-8"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={1.5}
													d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
												/>
											</svg>
										),
										title: "Score Tracking",
										desc: "Monitor your resume performance over time",
									},
									{
										icon: (
											<svg
												className="w-8 h-8"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={1.5}
													d="M13 10V3L4 14h7v7l9-11h-7z"
												/>
											</svg>
										),
										title: "Quick Insights",
										desc: "Receive actionable improvement suggestions",
									},
								].map((feature, index) => (
									<div
										key={index}
										className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
										<div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white mb-4">
											{feature.icon}
										</div>
										<h4 className="font-semibold text-gray-800 mb-2">
											{feature.title}
										</h4>
										<p className="text-sm text-gray-600">
											{feature.desc}
										</p>
									</div>
								))}
							</div>
						</div>
					)}
				</section>

				<Footer />
			</div>
		</main>
	);
}
