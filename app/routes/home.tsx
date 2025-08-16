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

	useEffect(() => {
		if (!auth.isAuthenticated) navigate("/auth?next=/");
	}, [auth.isAuthenticated]);

	useEffect(() => {
		const loadResumes = async () => {
			setLoadingResume(true);
			const resumes = (await kv.list("resume:*", true)) as KVItem[];
			const parsedResumes = resumes?.map(
				(resume) => JSON.parse(resume.value) as Resume
			);
			
			console.log(parsedResumes);
			setResumes(parsedResumes || []);
			setLoadingResume(false);
		};

		loadResumes();
	}, [kv]);

	return (
		<main className="bg-[url('/images/bg-main.svg')] bg-cover bg-blue-100 flex flex-col min-h-screen">
			<Navbar />
			<section className="main-section flex-grow">
				<div className="page-heading py-16">
					<h1 className="text-gradient">
						Monitor Your Job Applications & AI Resume Scores
					</h1>
					{!loadingResume && resumes.length === 0 && (
						<h2 className="text-2xl">
							No resume found. Upload your first resume to get
							feedback.
						</h2>
					)}
					<h2>
						Review, improve, and stand out with AI-powered insights.
					</h2>
				</div>

				{loadingResume && (
					<div className="flex flex-col items-center justify-center">
						<img
							src="/images/resume-scan-2.gif"
							alt="resume"
							className="w-[200px]"
						/>
					</div>
				)}

				{!loadingResume && resumes.length > 0 && (
					<div className="resumes-section">
						{resumes.map((resume) => (
							<ResumeCard key={resume.id} resume={resume} />
						))}
					</div>
				)}

				{!loadingResume && resumes.length === 0 && (
					<div className="flex flex-col items-center justify-center mt-10 g-4">
						<Link
							to="/upload"
							className="primary-button w-fit text-xl font-semibold">
							Upload Resume
						</Link>
					</div>
				)}
			</section>
			<Footer />
		</main>
	);
}
