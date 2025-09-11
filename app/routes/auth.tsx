import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
	{ title: "ResumeRadar | Auth" },
	{
		name: "description",
		content: "Log into your account to access ResumeRadar",
	},
];

const auth = () => {
	const { isLoading, auth } = usePuterStore();
	const location = useLocation();
	const next = location.search.split("next=")[1];
	const navigate = useNavigate();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		if (auth.isAuthenticated) navigate(next);
	}, [auth.isAuthenticated, next]);

	return (
		<main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
			
			{/* Floating particles */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{[...Array(20)].map((_, i) => (
					<div
						key={i}
						className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-bounce"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							animationDelay: `${Math.random() * 3}s`,
							animationDuration: `${3 + Math.random() * 4}s`,
						}}></div>
				))}
			</div>

			<div className="relative z-10 flex items-center justify-center min-h-screen p-4">
				<div
					className={`transform transition-all duration-1000 ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
					{/* Main card with glassmorphism effect */}
					<div className="relative group">
						{/* Gradient border animation */}
						<div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-x"></div>

						<section className="relative bg-white/80 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white/20 max-w-md w-full">
							{/* Logo/Brand area */}
							<div className="text-center mb-8">
								<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
									<svg
										className="w-8 h-8 text-white"
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
								</div>
								<h1 className="text-md font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
									Welcome Back
								</h1>
								<p className="text-gray-600 text-lg font-medium">
									Continue Your Job Journey
								</p>
								<div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-4"></div>
							</div>

							{/* Auth button section */}
							<div className="space-y-6">
								{isLoading ? (
									<button className="w-full group relative overflow-hidden bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg">
										<div className="flex items-center justify-center space-x-3">
											<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
											<span className="text-lg">
												Signing you in...
											</span>
										</div>
									</button>
								) : (
									<>
										{auth.isAuthenticated ? (
											<button
												className="w-full group relative overflow-hidden bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0"
												onClick={auth.signOut}>
												<div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
												<div className="relative flex items-center justify-center space-x-3">
													<svg
														className="w-5 h-5"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24">
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
														/>
													</svg>
													<span className="text-lg">
														Log Out
													</span>
												</div>
											</button>
										) : (
											<button
												className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 cursor-pointer"
												onClick={auth.signIn}>
												<div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
												<div className="relative flex items-center justify-center space-x-3">
													<svg
														className="w-5 h-5"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24">
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
														/>
													</svg>
													<span className="text-lg">
														Log In
													</span>
												</div>

												{/* Ripple effect */}
												<div className="absolute inset-0 rounded-2xl overflow-hidden">
													<div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transform scale-0 group-hover:scale-100 transition-all duration-500 rounded-full"></div>
												</div>
											</button>
										)}
									</>
								)}

								{/* Additional features */}
								<div className="text-center pt-4">
									<p className="text-sm text-gray-500 mb-4">
										Secure authentication powered by Puter
									</p>
									<div className="flex items-center justify-center space-x-4 text-gray-400">
										<div className="flex items-center space-x-1">
											<svg
												className="w-4 h-4"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
												/>
											</svg>
											<span className="text-xs">
												Secure
											</span>
										</div>
										<div className="w-1 h-1 bg-gray-300 rounded-full"></div>
										<div className="flex items-center space-x-1">
											<svg
												className="w-4 h-4"
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
											<span className="text-xs">
												Fast
											</span>
										</div>
										<div className="w-1 h-1 bg-gray-300 rounded-full"></div>
										<div className="flex items-center space-x-1">
											<svg
												className="w-4 h-4"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
												/>
											</svg>
											<span className="text-xs">
												Reliable
											</span>
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
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
		</main>
	);
};

export default auth;
