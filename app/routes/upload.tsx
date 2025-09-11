import { prepareInstructions } from "constants/index";
import { useState, type FormEvent, useEffect } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import { convertPdfToImage } from "~/lib/pdf2img";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utils";
import { HiOutlineLightBulb } from "react-icons/hi";

const upload = () => {
	const { auth, isLoading, fs, ai, kv } = usePuterStore();
	const navigate = useNavigate();
	const [isProcessing, setIsProcessing] = useState(false);
	const [statusText, setStatusText] = useState("");
	const [file, setFile] = useState<File | null>(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleFileSelect = (file: File | null) => {
		setFile(file);
	};

	const handleAnalyzer = async ({
		companyName,
		jobTitle,
		jobDescription,
		file,
	}: {
		companyName: string;
		jobTitle: string;
		jobDescription: string;
		file: File;
	}) => {
		setIsProcessing(true);

		setStatusText("Uploading the file...");
		const uploadedFile = await fs.upload([file]);
		if (!uploadedFile) return setStatusText("Error: Failed to upload file");

		setStatusText("Converting to image...");
		const imageFile = await convertPdfToImage(file);
		if (!imageFile.file)
			return setStatusText("Error: Failed to convert PDF to image");

		setStatusText("Uploading the image...");
		const uploadedImage = await fs.upload([imageFile.file]);
		if (!uploadedImage)
			return setStatusText("Error: Failed to upload image");

		setStatusText("Preparing data...");
		const uuid = generateUUID();
		const data = {
			id: uuid,
			resumePath: uploadedFile.path,
			imagePath: uploadedImage.path,
			companyName,
			jobTitle,
			jobDescription,
			feedback: "",
		};
		await kv.set(`resume:${uuid}`, JSON.stringify(data));

		setStatusText("Analyzing...");

		const feedback = await ai.feedback(
			uploadedFile.path,
			prepareInstructions({ jobTitle, jobDescription })
		);
		if (!feedback) return setStatusText("Error: Failed to analyze resume");

		const feedbackText =
			typeof feedback.message.content === "string"
				? feedback.message.content
				: feedback.message.content[0].text;

		data.feedback = JSON.parse(feedbackText);
		await kv.set(`resume:${uuid}`, JSON.stringify(data));
		setStatusText("Analysis complete, redirecting...");
		console.log(data);
		navigate(`/resume/${uuid}`);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget.closest("form");
		if (!form) return;
		const formData = new FormData(form);

		const companyName = formData.get("company-name") as string;
		const jobTitle = formData.get("job-title") as string;
		const jobDescription = formData.get("job-description") as string;

		if (!file) return;

		handleAnalyzer({ companyName, jobTitle, jobDescription, file });
	};

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
								Smart Feedback for Your Dream Job
							</h1>

							{isProcessing ? (
								<h2 className="text-xl md:text-2xl text-gray-600 mb-4 font-medium">
									{statusText}
								</h2>
							) : (
								<>
									<h2 className="text-xl md:text-2xl text-gray-600 mb-4 font-medium">
										Drop your resume for an ATS score and
										improvement tips
									</h2>
									<p className="text-lg text-gray-600 font-medium">
										Get AI-powered insights to make your
										resume stand out.
									</p>
								</>
							)}

							{/* Decorative line */}
							<div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-8"></div>
						</div>
					</div>

					{/* Processing State */}
					{isProcessing && (
						<div
							className={`flex flex-col items-center justify-center py-10 transform transition-all duration-1000 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
							<div className="relative mb-8">
								<div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
								<div className="relative bg-white/80 backdrop-blur-sm rounded-full p-8 shadow-2xl border border-white/20">
									<img
										src="/images/resume-scan.gif"
										alt="scan"
										className="w-32 h-32 object-contain"
									/>
								</div>
							</div>
							<div className="text-center">
								<h3 className="text-xl font-semibold text-gray-700 mb-2">
									Analyzing Your Resume
								</h3>
								<p className="text-gray-500">
									AI is processing your document...
								</p>
							</div>
						</div>
					)}

					{/* Upload Form */}
					{!isProcessing && (
						<div
							className={`pb-16 transform transition-all duration-1000 delay-300 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
							<div className="w-full max-w-4xl mx-auto px-4 md:px-6">
								<div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
									<form
										id="upload-form"
										onSubmit={handleSubmit}
										className="space-y-4">
										<div className="form-group w-full">
											<label
												htmlFor="company-name"
												className="block text-sm font-semibold text-gray-700 mb-3">
												Company Name
											</label>
											<input
												type="text"
												name="company-name"
												placeholder="Enter company name"
												id="company-name"
												className="w-full px-4 py-4 bg-white/70 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400 shadow-sm hover:shadow-md"
											/>
										</div>

										<div className="form-group w-full">
											<label
												htmlFor="job-title"
												className="block text-sm font-semibold text-gray-700 mb-3">
												Job Title
											</label>
											<input
												type="text"
												name="job-title"
												placeholder="Enter job title"
												id="job-title"
												className="w-full px-4 py-4 bg-white/70 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400 shadow-sm hover:shadow-md"
											/>
										</div>

										<div className="form-group w-full">
											<label
												htmlFor="job-description"
												className="block text-sm font-semibold text-gray-700 mb-3">
												Job Description
											</label>
											<textarea
												rows={6}
												name="job-description"
												placeholder="Paste the job description here..."
												id="job-description"
												className="w-full px-4 py-4 bg-white/70 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400 shadow-sm hover:shadow-md resize-none"
											/>
										</div>

										<div className="form-group w-full">
											<label
												htmlFor="uploader"
												className="block text-sm font-semibold text-gray-700 mb-3">
												Upload Resume
											</label>
											<div className="bg-white/70 border-2 border-dashed border-gray-300 rounded-2xl p-8 transition-all duration-300 hover:border-blue-400 hover:bg-white/80">
												<FileUploader
													onFileSelect={
														handleFileSelect
													}
												/>
											</div>
										</div>

										{/* Submit Button */}
										<button
											className="group relative w-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
											type="submit"
											disabled={!file}>
											<div className="relative flex items-center justify-center space-x-3">
												<HiOutlineLightBulb className="w-5 h-5"/>
												<span className="text-lg">
													Analyze Resume
												</span>
												
											</div>

											{/* Ripple effect */}
											<div className="absolute inset-0 rounded-2xl overflow-hidden">
												<div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transform scale-0 group-hover:scale-100 transition-all duration-500 rounded-full"></div>
											</div>
										</button>
									</form>
								</div>
							</div>
						</div>
					)}
				</section>

				<Footer />
			</div>
		</main>
	);
};

export default upload;
