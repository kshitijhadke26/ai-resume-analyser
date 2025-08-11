import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";

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
	return (
		<main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
			<section className="main-section">
				<div className="page-heading">
					<h1 className="text-gradient">
						Monitor Your Job Applications & AI Resume Scores
					</h1>
					<h2>
						Review, improve, and stand out with AI-powered insights.
					</h2>
				</div>
			</section>
		</main>
	);
}
