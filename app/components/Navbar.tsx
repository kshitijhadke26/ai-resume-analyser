import { Link } from "react-router";

const Navbar = () => {
	return (
		<nav className="navbar">
				<Link to="/">
					<p className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300">
						RESUMERADAR
					</p>
				</Link>
				<Link
					to="/upload"
					className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
					Upload Resume
				</Link>

		</nav>
	);
};

export default Navbar;

// import { Link } from "react-router";

// const Navbar = () => {
// 	return (
// 		<nav className="bg-white px-4 py-4 shadow-md w-full">
// 			<div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
// 				<Link to="/">
// 					<p className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent transition-all duration-300">
// 						RESUMERADAR
// 					</p>
// 				</Link>

// 				<Link
// 					to="/upload"
// 					className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
// 					Upload Resume
// 				</Link>
// 			</div>
// 		</nav>
// 	);
// };

// export default Navbar;

// import { Link } from "react-router";

// const Navbar = () => {
// 	return (
// 		<nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-lg">
// 			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// 				<div className="flex items-center justify-between h-16">
// 					<Link to="/" className="group">
// 						<p className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:via-purple-700 group-hover:to-pink-700 transition-all duration-300">
// 							RESUMERADAR
// 						</p>
// 					</Link>
// 					<Link
// 						to="/upload"
// 						className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
// 						Upload Resume
// 					</Link>
// 				</div>
// 			</div>
// 		</nav>
// 	);
// };

// export default Navbar;
