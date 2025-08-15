import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { resumes } from "../../constants";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { useEffect } from "react";
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
	const { auth } = usePuterStore();
	const navigate = useNavigate();

	useEffect(() => {
		if (!auth.isAuthenticated) navigate("/auth?next=/");
	}, [auth.isAuthenticated]);

	return (
		<main className="bg-[url('/images/bg-main.svg')] bg-cover flex flex-col min-h-screen">
			<Navbar />
			<section className="main-section flex-grow">
				<div className="page-heading py-16">
					<h1 className="text-gradient">
						Monitor Your Job Applications & AI Resume Scores
					</h1>
					<h2>
						Review, improve, and stand out with AI-powered insights.
					</h2>
				</div>

				{resumes.length > 0 && (
					<div className="resumes-section">
						{resumes.map((resume) => (
							<ResumeCard key={resume.id} resume={resume} />
						))}
					</div>
				)}
			</section>
			<Footer />
		</main>
	);
}
